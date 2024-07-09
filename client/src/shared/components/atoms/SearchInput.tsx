import React from 'react';
import { styled } from 'styled-components';

const Input = styled.input`
	width: 400px;
	height: 40px;
	line-height: 40px;
	padding: 0px 45px 0px 20px;

	color: #444;
	font-family: var(--main-font-kor);
	font-size: 15px;
	font-weight: 400;

	border: 1px solid var(--sub-color-green);
	border-radius: 20px;
	outline: none;

	&::placeholder {
		color: #aaa;
	}
`;

function SearchInput(): JSX.Element {
	return <Input type="text" placeholder="검색어를 입력해주세요" />;
}

export default SearchInput;
