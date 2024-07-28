import axios from 'axios';
import authAxios from '@config/axiosInstance/authAxios';

import { APIS } from '@constants/apis';
import { IReviewForm } from '../types/reviewData';

const reviewApis = {
	addReview: async (formData: IReviewForm) => {
		const response = await authAxios.post(APIS.REVIEW.ADD, formData);
		return response.data.reviewId;
	},
};

export default reviewApis;
