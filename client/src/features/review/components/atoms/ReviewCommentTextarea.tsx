import React from 'react';
import styled from 'styled-components';

import { PrimaryTextareaWithStyles } from '@inputs';

const Textarea = styled(PrimaryTextareaWithStyles)`
	border: none;
	box-shadow: none;
	outline: none;
	line-height: 1.5;
	overflow-y: scroll;

	&:focus {
		border: none;
	}

	&::-webkit-scrollbar {
		width: 13px;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #ddd;
		border-radius: 20px;
		border: 4px solid transparent;
		background-clip: content-box;
	}
`;

interface IReviewCommentInputProps {
	id: string;
	name: string;
	value: string;
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
}

function ReviewCommentTextarea({
	id,
	name,
	value,
	handleChange,
}: IReviewCommentInputProps): JSX.Element {
	return (
		<Textarea
			id={id}
			name={name}
			value={value}
			onChange={handleChange}
			$height="120px"
		/>
	);
}

export default ReviewCommentTextarea;
