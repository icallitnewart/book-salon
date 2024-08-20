import React from 'react';
import { styled } from 'styled-components';

import { Span } from '@typographies';

const Button = styled.button`
	background-color: transparent;
	border: none;
	padding: 0;
	cursor: pointer;
`;

interface IReviewMetaButtonsProps {
	children: React.ReactNode | string;
	type?: 'button' | 'submit' | 'reset';
	variantType?: 'article' | 'card';
	variantSize?: 'sm' | 'md' | 'lg';
	onClick: () => void;
}

function ReviewMetaButton({
	children,
	type = 'button',
	variantType = 'article',
	variantSize = 'md',
	onClick,
}: IReviewMetaButtonsProps) {
	return (
		<Button type={type} onClick={onClick}>
			<Span
				variant={`${variantType}-meta-${variantSize}`}
				$fontWeight={500}
				$color="#888"
				$hoverColor="var(--sub-color-darkgreen)"
			>
				{children}
			</Span>
		</Button>
	);
}

export default ReviewMetaButton;
