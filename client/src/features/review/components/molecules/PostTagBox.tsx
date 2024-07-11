import React from 'react';
import { styled } from 'styled-components';

import TagText from '@typographies/TagText';

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
				<TagText key={tag.id}>{tag.text}</TagText>
			))}
		</Container>
	);
}

export default PostTagBox;
