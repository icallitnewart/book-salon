import axios from 'axios';
import authAxios from '@config/axiosInstance/authAxios';

import { APIS } from '@constants/apis';
import { IReviewDetail, IReviewForm } from '../types/reviewData';

const reviewApis = {
	addReview: async (formData: IReviewForm): Promise<string> => {
		const response = await authAxios.post(APIS.REVIEW.ADD, formData);
		return response.data.reviewId;
	},
	getReviewDetail: async (reviewId: string): Promise<IReviewDetail> => {
		const response = await axios.get(APIS.REVIEW.DETAIL(reviewId));
		return response.data.review;
	},
};

export default reviewApis;
