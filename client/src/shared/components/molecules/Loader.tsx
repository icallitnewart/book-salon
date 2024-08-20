import React from 'react';
import { keyframes, styled } from 'styled-components';

interface ISpinnerStyleProps {
	$size?: number;
}

const spinningAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div<ISpinnerStyleProps>`
	margin: 60px auto;
	font-size: 10px;
	position: relative;
	text-indent: -9999em;
	border-top: 1em solid rgba(209, 209, 209, 0.2);
	border-right: 1em solid rgba(209, 209, 209, 0.2);
	border-bottom: 1em solid rgba(209, 209, 209, 0.2);
	border-left: 1em solid #d1d1d1;
	transform: translateZ(0);
	animation: ${spinningAnimation} 1.1s infinite linear;

	&,
	&:after {
		border-radius: 50%;
		width: ${({ $size }) => $size}em;
		height: ${({ $size }) => $size}em;
	}
`;

type ILoaderProps = ISpinnerStyleProps;

function Loader({ $size = 4 }: ILoaderProps): JSX.Element {
	return <Spinner $size={$size} />;
}

export default Loader;
