import React from 'react';
import { styled } from 'styled-components';

import { IReviewFormProps } from '@features/review/types/reviewProps';

import { Heading3 as Title } from '@typographies';
import BookProfileLayoutTemplate from '@features/book/components/templates/BookProfileLayoutTemplate';
import ReviewForm from '../organisms/ReviewForm';

const Container = styled.div`
	flex: 1;
	padding: 50px 0px 50px 20px;
`;

type IReviewFormTemplateProps<T extends boolean> = IReviewFormProps<T>;

function ReviewFormTemplate<T extends boolean>({
	isEditMode,
	submitMutation,
	initialData,
}: IReviewFormTemplateProps<T>): JSX.Element {
	return (
		<BookProfileLayoutTemplate>
			<Container>
				<Title
					variant="section-title-lg"
					$fontWeight={700}
					$marginBottom="30px"
					$textAlign="center"
					$color="#555"
				>
					{isEditMode ? 'Edit' : 'Add'} Review
				</Title>
				<ReviewForm
					isEditMode={isEditMode}
					submitMutation={submitMutation}
					initialData={initialData}
				/>
			</Container>
		</BookProfileLayoutTemplate>
	);
}

export default ReviewFormTemplate;
