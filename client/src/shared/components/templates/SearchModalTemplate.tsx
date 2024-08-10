import React from 'react';

import SearchModal from '@components/organisms/SearchModal';
import ModalLayoutTemplate from './ModalLayoutTemplate';

interface ISearchModalTemplateProps {
	isOpen: boolean;
	closeModal: () => void;
}

function SearchModalTemplate({
	isOpen,
	closeModal,
}: ISearchModalTemplateProps): JSX.Element {
	return (
		<ModalLayoutTemplate isOpen={isOpen} closeModal={closeModal}>
			<SearchModal />
		</ModalLayoutTemplate>
	);
}

export default SearchModalTemplate;
