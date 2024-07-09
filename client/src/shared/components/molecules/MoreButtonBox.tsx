import React from 'react';
import { styled } from 'styled-components';

import { DarkGreenTextButton } from '@buttons/TextButtons/ColoredTextButtons';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 40px 0px 30px;
`;

function MoreButtonBox(): JSX.Element {
	return (
		<Container>
			<DarkGreenTextButton $width="120px">더보기</DarkGreenTextButton>
		</Container>
	);
}

export default MoreButtonBox;
