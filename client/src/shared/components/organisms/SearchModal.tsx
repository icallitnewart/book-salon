import React from 'react';
import { styled } from 'styled-components';

import { ParagraphWithStyles } from '@typographies';
import BookSearchList from '@features/book/components/organisms/BookSearchList';
import ModalSearchBar from './ModalSearchBar';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 600px;
	height: 550px;

	background-color: #fff;
`;

const ShortcutInfo = styled(ParagraphWithStyles)`
	display: flex;
	align-items: center;
	width: 100%;
	height: 30px;
	padding-bottom: 1px;

	border-top: 1px solid #ddd;
	box-shadow: -2px 0px 4px rgba(0, 0, 0, 0.1);
`;

const InfoText = styled.span`
	padding: 0px 10px;

	&:not(:last-child) {
		border-right: 1px solid #ddd;
	}
`;

interface ISearchModalProps {
	closeModal: () => void;
}

function SearchModal({ closeModal }: ISearchModalProps): JSX.Element {
	return (
		<Container>
			<ModalSearchBar />
			<BookSearchList closeModal={closeModal} />
			<ShortcutInfo variant="list-meta-sm" $color="#888">
				<InfoText>[↑or↓] 이동</InfoText>
				<InfoText>[Enter] 선택 </InfoText>
				<InfoText>[ESC] 닫기</InfoText>
			</ShortcutInfo>
		</Container>
	);
}

export default SearchModal;
