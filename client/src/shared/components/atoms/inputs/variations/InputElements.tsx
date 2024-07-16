import styled from 'styled-components';
import BaseInput from './BaseInput';
import {
	IInputStylesProps,
	inputStyles,
	inputVariantStyles,
} from '../inputStyles';

export const DefaultInput = styled(BaseInput).attrs({
	as: 'input',
	variant: 'default',
})<IInputStylesProps>`
	${({ variant }) => variant && inputVariantStyles[variant]}
	${inputStyles}
`;
