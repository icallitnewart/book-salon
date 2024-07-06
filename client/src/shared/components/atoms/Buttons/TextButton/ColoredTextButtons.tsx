import styled from 'styled-components';

import { ITextButtonStylesProps } from './TextButtonStyles';
import { BaseTextButton } from './BaseTextButton';

export const BlackTextButton = styled(BaseTextButton).attrs({
	as: 'button',
})<ITextButtonStylesProps>`
	background-color: #000;

	&:hover {
		color: ${({ $hoverTextColor }) =>
			$hoverTextColor || 'var(--sub-color-green)'};
	}
`;

export const DarkGreenTextButton = styled(BaseTextButton).attrs({
	as: 'button',
})<ITextButtonStylesProps>`
	background-color: var(--sub-color-darkgreen);
`;
