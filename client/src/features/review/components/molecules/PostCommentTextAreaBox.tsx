import React from 'react';
import { styled } from 'styled-components';

import { DarkGreenTextButton } from '@buttons/TextButtons/ColoredTextButtons';
import TextArea from '@components/atoms/TextArea';

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex: 1;
	gap: 15px;
`;

function PostCommentTextAreaBox(): JSX.Element {
	return (
		<Container>
			<TextArea />
			<DarkGreenTextButton $width="100px">작성</DarkGreenTextButton>
		</Container>
	);
}

export default PostCommentTextAreaBox;
