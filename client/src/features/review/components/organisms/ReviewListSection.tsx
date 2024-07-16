import React from 'react';
import { styled } from 'styled-components';

import SectionTitleWithHighlight from '@components/molecules/SectionTitleWithHighlight';
import MoreButtonBox from '@components/molecules/MoreButtonBox';
import ReviewCardList from './ReviewCardList';

const Container = styled.section`
	width: 100%;
	padding: 50px 0px;
`;

function ReviewListSection(): JSX.Element {
	return (
		<Container>
			<SectionTitleWithHighlight
				title="Reviews"
				variantSize="lg"
				$textAlign="center"
			/>
			<ReviewCardList />
			<MoreButtonBox />
		</Container>
	);
}

export default ReviewListSection;
