import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { SearchOptionType } from '@typeDefs/data';

import { ReactComponent as ArrowDownSvg } from '@assets/svg/arrow_down.svg';
import { ReactComponent as ArrowUpSvg } from '@assets/svg/arrow_up.svg';
import { Span } from '@typographies';

const Container = styled.div`
	position: relative;
	width: 110px;
	height: calc(100% + 1px);

	border-right: 1px solid #ddd;
	cursor: pointer;
`;

const SelectedOption = styled.div<{ $isOptionListOpen: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 0px 8px 0px 10px;

	${({ $isOptionListOpen }) =>
		$isOptionListOpen &&
		css`
			svg {
				color: #666;
			}
		`}

	span {
		display: inline-block;
	}
`;

const arrowIconStyles = css`
	width: 18px;
	height: 18px;
	color: var(--sub-color-darkgreen);
`;

const ArrowDownIcon = styled(ArrowDownSvg)`
	${arrowIconStyles}
`;

const ArrowUpIcon = styled(ArrowUpSvg)`
	${arrowIconStyles}
`;

const SelectOptionList = styled.ul`
	position: absolute;
	top: 47px;
	left: 0px;
	width: 110px;

	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 0px 0px 3px 3px;
	box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.05);
	border-top: 4px solid #ddd;
`;

const SelectOptionItem = styled.li`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 45px;

	&:hover {
		background-color: var(--sub-color-darkgreen);

		span {
			color: #fff;
			font-weight: 500;
		}
	}
`;

interface ISearchSelectBoxProps {
	selectedOption: SearchOptionType;
	changeSelectedOption: React.Dispatch<React.SetStateAction<SearchOptionType>>;
}

function SearchSelectBox({
	selectedOption,
	changeSelectedOption,
}: ISearchSelectBoxProps): JSX.Element {
	const [isOptionListOpen, setIsOptionListOpen] = useState(false);

	const handleClickOptionList = () => {
		setIsOptionListOpen(prev => !prev);
	};

	const handleClickOptionItem = (option: SearchOptionType) => {
		changeSelectedOption(option);
		setIsOptionListOpen(false);
	};

	return (
		<Container>
			<SelectedOption
				onClick={handleClickOptionList}
				$isOptionListOpen={isOptionListOpen}
			>
				<Span
					variant="article-subtitle-sm"
					$fontFamily="var(--main-font-eng)"
					$color={isOptionListOpen ? '#666' : 'var(--sub-color-darkgreen)'}
					$flex="1"
					$textAlign="center"
					$fontWeight={600}
				>
					{selectedOption}
				</Span>
				{isOptionListOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
			</SelectedOption>
			{isOptionListOpen && (
				<SelectOptionList>
					{Object.values(SearchOptionType).map(option => (
						<SelectOptionItem onClick={() => handleClickOptionItem(option)}>
							<Span
								variant="article-body-lg"
								$fontFamily="var(--main-font-eng)"
								$fontWeight={500}
								$color="#666"
							>
								{option}
							</Span>
						</SelectOptionItem>
					))}
				</SelectOptionList>
			)}
		</Container>
	);
}

export default SearchSelectBox;
