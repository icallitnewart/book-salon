import React from 'react';
import styled from 'styled-components';

import { SubtleButton } from '@buttons';
import { Paragraph } from '@typographies';
import { ReactComponent as ErrorSvg } from '@assets/svg/error.svg';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 300px;
`;

const ErrorIcon = styled(ErrorSvg)`
	width: 100px;
	height: 100px;
	color: #ccc;
	margin-bottom: 20px;
`;

interface IErrorFallbackProps {
	error: Error | null;
	resetErrorBoundary: () => void;
}

function ErrorFallback({
	error,
	resetErrorBoundary,
}: IErrorFallbackProps): JSX.Element {
	return (
		<Container>
			<ErrorIcon />
			<Paragraph
				variant="article-subtitle-md"
				$color="#bbb"
				$marginBottom="5px"
			>
				데이터를 불러오는데 실패하였습니다.
			</Paragraph>
			<Paragraph
				variant="article-subtitle-md"
				$color="#bbb"
				$marginBottom="25px"
			>
				다시 시도하시겠습니까?
			</Paragraph>
			<SubtleButton type="button" $width="100px" onClick={resetErrorBoundary}>
				재시도
			</SubtleButton>
		</Container>
	);
}

export default React.memo(ErrorFallback);
