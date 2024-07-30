/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import authAxios from '@config/axiosInstance/authAxios';

import { convertObjectId } from '@utils/dataTransform';
import { APIS } from '@constants/apis';
import {
	IReviewDetail,
	IReviewDetailData,
	IReviewForm,
} from '../types/reviewData';

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
};

export default reviewApis;
