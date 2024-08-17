import { isValidObjectId, Types } from 'mongoose';
import { ILike, Like, LikeType } from './likeModel';

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
}

export const likeDAO = new LikeDAO();
