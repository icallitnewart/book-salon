import React from 'react';

import { Paragraph } from '@typographies';

interface ISearchEmptyAlertProps {
	searchTerm: string;
}

function SearchEmptyAlert({ searchTerm }: ISearchEmptyAlertProps): JSX.Element {
	return (
		<Paragraph variant="article-body-md" $textAlign="center" $color="#666">
			{`"${searchTerm}"에 대한 검색 결과가 없습니다.`}
		</Paragraph>
	);
}

export default SearchEmptyAlert;
