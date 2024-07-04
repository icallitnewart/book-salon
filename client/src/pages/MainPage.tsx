import React from 'react';

import PageTemplate from '../shared/components/templates/PageTemplate';
import MainTemplate from '../shared/components/templates/MainTemplate';

function MainPage(): JSX.Element {
	return (
		<PageTemplate>
			<MainTemplate />
		</PageTemplate>
	);
}

export default MainPage;
