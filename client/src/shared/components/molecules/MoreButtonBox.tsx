import React from 'react';
import { styled } from 'styled-components';

import { PrimaryButton } from '@buttons';

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
			<PrimaryButton type="button" $width="120px">
				더보기
			</PrimaryButton>
		</Container>
	);
}

export default MoreButtonBox;
