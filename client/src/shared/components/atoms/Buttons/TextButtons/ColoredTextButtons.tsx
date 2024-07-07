import styled from 'styled-components';

import {
	ITextButtonStylesProps,
	textButtonStyles,
	textButtonVariantStyles,
} from './TextButtonStyles';

import BaseTextButton from './BaseTextButton';

export const BlackTextButton = styled(BaseTextButton).attrs({
	as: 'button',
})<ITextButtonStylesProps>`
	${textButtonStyles}
	${({ variant }) => variant && textButtonVariantStyles[variant]}
	
	background-color: #000;

	&:hover {
		color: ${({ $hoverTextColor }) =>
			$hoverTextColor || 'var(--sub-color-green)'};
	}
`;

export const DarkGreenTextButton = styled(BaseTextButton).attrs({
	as: 'button',
})<ITextButtonStylesProps>`
	${textButtonStyles}
	${({ variant }) => variant && textButtonVariantStyles[variant]}
	
	background-color: var(--sub-color-darkgreen);
`;
