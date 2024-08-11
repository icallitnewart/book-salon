import React from 'react';
import { styled } from 'styled-components';

import useInput from '@hooks/useInput';

import { SearchOptionType } from '@typeDefs/data';

import { ReactComponent as SearchSvg } from '@assets/svg/search_lg.svg';
import { InvisibleInputWithStyles } from '@inputs';
import SearchSelectBox from '../molecules/SearchSelectBox';

const Form = styled.form`
	display: flex;
	align-items: center;
	width: 100%;
	height: 55px;

	border-bottom: 1px solid #ddd;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
`;

const SearchInput = styled(InvisibleInputWithStyles)`
	flex: 1;
`;

const SearchButton = styled.button`
	background-color: transparent;
	border: none;
	padding: 0;
`;

const SearchIcon = styled(SearchSvg)`
	width: 30px;
	height: 30px;
	margin: 0px 10px;
	color: #aaa;
	cursor: pointer;
`;

const searchPlaceholder = {
	[SearchOptionType.BOOK]: '도서 제목이나 저자를 검색해주세요',
	[SearchOptionType.REVIEW]: '리뷰 제목이나 내용을 검색해주세요',
};

interface IModalSearchBarProps {
	selectedOption: SearchOptionType;
	changeSelectedOption: React.Dispatch<React.SetStateAction<SearchOptionType>>;
	searchByTerm: (searchTerm: string) => void;
}

function ModalSearchBar({
	selectedOption,
	changeSelectedOption,
	searchByTerm,
}: IModalSearchBarProps): JSX.Element {
	const { value, handleChange } = useInput('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (value.trim() === '') {
			alert('검색어를 입력해주세요');
			return;
		}

		searchByTerm(value);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<SearchSelectBox
				selectedOption={selectedOption}
				changeSelectedOption={changeSelectedOption}
			/>
			<SearchInput
				id="search"
				name="search"
				value={value}
				onChange={handleChange}
				placeholder={searchPlaceholder[selectedOption]}
				$height="100%"
				$fontSize={1.6}
				$color="#555"
				$padding="0px 8px"
			/>
			<SearchButton type="submit">
				<SearchIcon />
			</SearchButton>
		</Form>
	);
}

export default ModalSearchBar;
