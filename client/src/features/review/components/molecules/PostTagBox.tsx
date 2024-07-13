import React from 'react';
import { styled } from 'styled-components';

import ReviewTagItem from '../atoms/ReviewTagItem';

const Container = styled.div`
	display: inline-flex;
	gap: 0px 7px;
`;

interface ITag {
	id: number;
	text: string;
}

interface IPostTagBoxProps {
	tags: ITag[];
}

function PostTagBox({ tags }: IPostTagBoxProps): JSX.Element {
	return (
		<Container>
			{tags.map(tag => (
				<ReviewTagItem key={tag.id}>{tag.text}</ReviewTagItem>
			))}
		</Container>
	);
}

export default PostTagBox;
