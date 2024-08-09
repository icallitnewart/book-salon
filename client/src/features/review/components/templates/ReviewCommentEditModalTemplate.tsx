import React from 'react';

import ModalTemplate from '@components/templates/ModalTemplate';
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
		<ModalTemplate isOpen={isOpen}>
			<ReviewCommentEditForm
				content={content}
				closeModal={closeModal}
				commentId={commentId}
			/>
		</ModalTemplate>
	);
}

export default ReviewCommentEditModalTemplate;
