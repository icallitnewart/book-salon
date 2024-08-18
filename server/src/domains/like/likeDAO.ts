import { FilterQuery, isValidObjectId, Types } from 'mongoose';
import { IBook, ILike, ILikeModel, Like, LikeType } from './likeModel';

class LikeDAO {
	async create(
		userId: string,
		targetType: LikeType,
		targetId: string,
		extraData?: unknown,
	): Promise<ILike> {
		return Like.create({
			user: new Types.ObjectId(userId),
			target: {
				type: targetType,
				item: isValidObjectId(targetId)
					? new Types.ObjectId(targetId)
					: targetId,
				extraData: extraData || null,
			},
		});
	}

	async delete(
		userId: string,
		targetType: LikeType,
		targetId: string,
	): Promise<boolean> {
		const result = await Like.deleteOne({
			user: new Types.ObjectId(userId),
			'target.type': targetType,
			'target.item': isValidObjectId(targetId)
				? new Types.ObjectId(targetId)
				: targetId,
		});

		return result.deletedCount > 0;
	}

	async checkExistence(
		userId: string,
		targetType: LikeType,
		targetId: string,
	): Promise<boolean> {
		const like = await Like.findOne({
			user: new Types.ObjectId(userId),
			'target.type': targetType,
			'target.item': isValidObjectId(targetId)
				? new Types.ObjectId(targetId)
				: targetId,
		});

		return !!like;
	}

	async findBooksByUser(
		userId: string,
		targetType: LikeType,
		page: number,
		perPage: number,
	): Promise<IBook[]> {
		const skip = (page - 1) * perPage;

		return Like.find({
			user: new Types.ObjectId(userId),
			'target.type': targetType,
		})
			.skip(skip)
			.limit(perPage)
			.select('target.extraData -_id')
			.lean()
			.then(likes => likes.map(like => like.target.extraData as IBook));
	}

	async countDocumentsWithLimit(
		page: number,
		perPage: number,
		pageGroupSize: number,
		query: FilterQuery<ILikeModel> = {},
	): Promise<number> {
		// 현재 페이지가 속한 그룹이 몇 번째 그룹인지 계산
		const currentGroup = Math.ceil(page / pageGroupSize);
		// 현재 그룹의 시작 페이지 계산
		const firstPageInGroup = (currentGroup - 1) * pageGroupSize + 1;
		// 그룹의 시작 페이지 전까지 건너뛸 문서 수 계산
		const totalSkip = (firstPageInGroup - 1) * perPage;
		// 그룹의 마지막 문서 + 1까지 카운트할 문서 수 계산
		const docsToCount = pageGroupSize * perPage + 1;

		// 현재 속한 페이지 그룹의 문서 수 카운트
		return Like.countDocuments(query).skip(totalSkip).limit(docsToCount);
	}

	async findBooksByUserWithCount(
		userId: string,
		page: number,
		perPage: number,
		pageGroupSize: number,
	): Promise<[IBook[], number]> {
		return Promise.all([
			this.findBooksByUser(userId, LikeType.BOOK, page, perPage),
			this.countDocumentsWithLimit(page, perPage, pageGroupSize, {
				user: new Types.ObjectId(userId),
				'target.type': LikeType.BOOK,
			}),
		]);
	}
}

export const likeDAO = new LikeDAO();
