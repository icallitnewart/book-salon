import React from 'react';
import { keyframes, styled } from 'styled-components';

const spinnerSize = {
	sm: 20,
	md: 50,
	lg: 80,
};

interface ISpinnerStyleProps {
	$size?: 'sm' | 'md' | 'lg';
	$isDarkBg?: boolean;
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
	border-top: 5px solid rgba(209, 209, 209, 0.2);
	border-right: 5px solid rgba(209, 209, 209, 0.2);
	border-bottom: 5px solid rgba(209, 209, 209, 0.2);
	border-left: 5px solid
		${({ $isDarkBg }) => ($isDarkBg ? '#fdfdfd' : '#d1d1d1')};
	transform: translateZ(0);
	animation: ${spinningAnimation} 1.1s infinite linear;

	&,
	&:after {
		border-radius: 50%;
		width: ${({ $size }) => ($size ? spinnerSize[$size] : spinnerSize.md)}px;
		height: ${({ $size }) => ($size ? spinnerSize[$size] : spinnerSize.md)}px;
	}
`;

type ILoaderProps = ISpinnerStyleProps;

function Loader({
	$size = 'md',
	$isDarkBg = false,
}: ILoaderProps): JSX.Element {
	return <Spinner $size={$size} $isDarkBg={$isDarkBg} />;
}

export default Loader;
