import React from 'react';
import { styled } from 'styled-components';

interface IStyledReviewTextAreaStyleProps {
	$height?: string;
}

// TODO: 동적으로 높이 변경
const StyledReviewTextArea = styled.textarea<IStyledReviewTextAreaStyleProps>`
	flex: 1 1 auto;
	height: ${({ $height }) => $height || '50px'};
	padding: 12px;
	overflow-y: hidden;
	border-radius: 5px;
	border: 1px solid #ddd;
	box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
	resize: none;
	outline: none;

	line-height: 1.6;
	font-size: 1.6rem;
	font-family: var(--main-font-kor);
	color: #444;

	&:focus {
		border: 1px solid #bbb;
	}

	&::placeholder {
		color: #999;
	}
`;

interface IReviewTextAreaProps extends IStyledReviewTextAreaStyleProps {
	placeholder?: string;
	ariaLabel?: string;
	maxLength?: number;
}

function ReviewTextArea({
	$height,
	placeholder,
	ariaLabel,
	maxLength,
}: IReviewTextAreaProps): JSX.Element {
	return (
		<StyledReviewTextArea
			$height={$height}
			placeholder={placeholder}
			aria-label={ariaLabel}
			maxLength={maxLength}
		/>
	);
}

export default ReviewTextArea;
