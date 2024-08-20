import React from 'react';

import { IModalProps } from '@typeDefs/props';

import ModalLayoutTemplate from '@components/templates/ModalLayoutTemplate';
import ReviewRatingModal from '../organisms/ReviewRatingModal';

interface IReviewRatingModalTemplateProps extends IModalProps {
	handleSubmit: (rating: number) => void;
	initialRating?: number;
}

function ReviewRatingModalTemplate({
	isOpen,
	closeModal,
	handleSubmit,
	initialRating,
}: IReviewRatingModalTemplateProps): JSX.Element {
	return (
		<ModalLayoutTemplate isOpen={isOpen} closeModal={closeModal}>
			<ReviewRatingModal
				closeModal={closeModal}
				handleSubmit={handleSubmit}
				initialRating={initialRating}
			/>
		</ModalLayoutTemplate>
	);
}

export default ReviewRatingModalTemplate;
