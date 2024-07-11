import React from 'react';
import styled from 'styled-components';

import { Span } from '@typographies/TextElements';

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const Button = styled.button`
	background-color: transparent;
	border: none;
	padding: 0;
	cursor: pointer;
`;

const ButtonText = styled(Span).attrs({
	variant: 'card-meta-lg',
	$fontWeight: 500,
	$color: '#888',
	$hoverColor: 'var(--sub-color-darkgreen)',
})``;

function PostCommentButtonBox(): JSX.Element {
	return (
		<Container>
			<Button>
				<ButtonText>수정</ButtonText>
			</Button>
			<Span variant="card-meta-sm" $margin="0px 7px" $color="#bbb">
				|
			</Span>
			<Button>
				<ButtonText>삭제</ButtonText>
			</Button>
		</Container>
	);
}

export default PostCommentButtonBox;
