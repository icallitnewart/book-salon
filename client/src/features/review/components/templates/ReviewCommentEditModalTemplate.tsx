import React from 'react';

import ModalTemplate from '@components/templates/ModalTemplate';
import ReviewCommentEditForm from '../organisms/ReviewCommentEditForm';

interface IReviewCommentEditTemplateProps {
	isOpen: boolean;
	content: string;
	closeModal: () => void;
}

function ReviewCommentEditModalTemplate({
	isOpen,
	content,
	closeModal,
}: IReviewCommentEditTemplateProps): JSX.Element {
	return (
		<ModalTemplate isOpen={isOpen}>
			<ReviewCommentEditForm content={content} closeModal={closeModal} />
		</ModalTemplate>
	);
}

export default ReviewCommentEditModalTemplate;
