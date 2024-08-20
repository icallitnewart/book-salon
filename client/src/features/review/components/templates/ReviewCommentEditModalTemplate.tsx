import React from 'react';

import ModalLayoutTemplate from '@components/templates/ModalLayoutTemplate';
import ReviewCommentEditForm from '../molecules/ReviewCommentEditForm';

interface IReviewCommentEditTemplateProps {
	isOpen: boolean;
	content: string;
	closeModal: () => void;
	commentId: string;
}

function ReviewCommentEditModalTemplate({
	isOpen,
	content,
	closeModal,
	commentId,
}: IReviewCommentEditTemplateProps): JSX.Element {
	return (
		<ModalLayoutTemplate isOpen={isOpen} closeModal={closeModal}>
			<ReviewCommentEditForm
				content={content}
				closeModal={closeModal}
				commentId={commentId}
			/>
		</ModalLayoutTemplate>
	);
}

export default ReviewCommentEditModalTemplate;
