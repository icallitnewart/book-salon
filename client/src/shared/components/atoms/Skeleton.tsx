import React from 'react';
import { styled } from 'styled-components';
import SkeletonUI from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface IContainerStyleProps {
	$margin?: string;
	$marginTop?: string;
	$marginBottom?: string;
	$marginLeft?: string;
	$marginRight?: string;
}

const Container = styled.div<IContainerStyleProps>`
	${({ $margin }) => $margin && `margin: ${$margin};`}
	${({ $marginTop }) => $marginTop && `margin-top: ${$marginTop};`}
	${({ $marginBottom }) => $marginBottom && `margin-bottom: ${$marginBottom};`}
	${({ $marginLeft }) => $marginLeft && `margin-left: ${$marginLeft};`}
	${({ $marginRight }) => $marginRight && `margin-right: ${$marginRight};`}
`;

interface ISkeletonProps extends IContainerStyleProps {
	width?: number | string;
	height?: number | string;
}

function Skeleton({
	width,
	height,
	$margin,
	$marginTop,
	$marginBottom,
	$marginLeft,
	$marginRight,
}: ISkeletonProps): JSX.Element {
	const hasMargin =
		$margin || $marginTop || $marginBottom || $marginLeft || $marginRight;

	if (hasMargin) {
		return (
			<Container
				$margin={$margin}
				$marginTop={$marginTop}
				$marginBottom={$marginBottom}
				$marginLeft={$marginLeft}
				$marginRight={$marginRight}
			>
				<SkeletonUI width={width} height={height} />
			</Container>
		);
	}

	return <SkeletonUI width={width} height={height} />;
}

export default Skeleton;
