import { UseMutateFunction } from '@tanstack/react-query';
import { IReviewDetail, IReviewForm } from './reviewData';

export interface IReviewFormProps<T extends boolean> {
	isEditMode: T;
	initialData?: IReviewDetail;
	submitMutation: UseMutateFunction<
		T extends true ? IReviewDetail : string,
		Error,
		IReviewForm,
		unknown
	>;
}
