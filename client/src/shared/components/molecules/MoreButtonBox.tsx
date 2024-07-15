import React from 'react';
import { styled } from 'styled-components';

import TextButton from '@buttons/TextButton';

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
			<TextButton type="button" variant="green" $width="120px">
				더보기
			</TextButton>
		</Container>
	);
}

export default MoreButtonBox;
