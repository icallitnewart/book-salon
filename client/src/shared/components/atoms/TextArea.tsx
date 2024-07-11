import React from 'react';
import { styled } from 'styled-components';

// TODO: 동적으로 높이 변경
const StyledTextArea = styled.textarea`
	flex: 1;
	height: 50px;
	padding: 12px;
	overflow-y: hidden;
	border-radius: 5px;
	border: 1px solid #eee;
	box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
	resize: none;
	outline: none;

	line-height: 1.6;
	font-size: 1.6rem;
	font-family: var(--main-font-kor);
	color: #444;
`;

function TextArea(): JSX.Element {
	return <StyledTextArea />;
}

export default TextArea;
