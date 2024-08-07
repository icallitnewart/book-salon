import axios from 'axios';
import authAxios from '@config/axiosInstance/authAxios';

import { IReviewListOptions } from '@config/query/queryKeys';
import { convertObjectId } from '@utils/dataTransform';
import { APIS } from '@constants/apis';

import {
	IReviewDetail,
	IReviewDetailData,
	IReviewForm,
	IReviewList,
} from '../types/reviewData';
import {
	IReviewComment,
	IReviewCommentForm,
	IReviewCommentWithCount,
} from '../types/reviewCommentData';

const reviewApis = {
	addReview: async (formData: IReviewForm): Promise<string> => {
		const response = await authAxios.post(APIS.REVIEW.ADD, formData);
		return response.data.reviewId;
	},
	getReviewDetail: async (reviewId: string): Promise<IReviewDetail> => {
		const response = await axios.get(APIS.REVIEW.DETAIL(reviewId));
		const { review } = response.data;

		return convertObjectId<IReviewDetailData>(review, ['user']);
	},
	updateReview: async (
		formData: IReviewForm,
		reviewId: string,
	): Promise<IReviewDetail> => {
		const response = await authAxios.patch(
			APIS.REVIEW.UPDATE(reviewId),
			formData,
		);
		const { review } = response.data;

		return convertObjectId<IReviewDetailData>(review, ['user']);
	},
	deleteReview: async (reviewId: string): Promise<void> => {
		await authAxios.delete(APIS.REVIEW.DELETE(reviewId));
	},
	getReviewList: async (options: IReviewListOptions): Promise<IReviewList> => {
		const response = await axios.get(APIS.REVIEW.LIST(options));
		const { reviews, pageInfo } = response.data;
		const refinedReviews: IReviewDetail[] = reviews.map(
			(review: IReviewDetailData) =>
				convertObjectId<IReviewDetailData>(review, ['user']),
		);

		return {
			reviews: refinedReviews,
			pageInfo,
		};
	},
	getReviewCommentList: async (reviewId: string): Promise<IReviewComment[]> => {
		const response = await axios.get(APIS.REVIEW.COMMENT_LIST(reviewId));
		const { comments } = response.data;
		const refinedComments: IReviewComment[] = comments.map(
			(comment: IReviewComment) =>
				convertObjectId<IReviewComment>(comment, ['user']),
		);

		return refinedComments;
	},
	addReviewComment: async (
		formData: IReviewCommentForm,
		reviewId: string,
	): Promise<IReviewCommentWithCount> => {
		const response = await authAxios.post(
			APIS.REVIEW.ADD_COMMENT(reviewId),
			formData,
		);
		const { comment, commentCount } = response.data;
		const refinedComments = convertObjectId<IReviewComment>(comment, ['user']);

		return {
			comment: refinedComments,
			commentCount,
		};
	},
};

export default reviewApis;
