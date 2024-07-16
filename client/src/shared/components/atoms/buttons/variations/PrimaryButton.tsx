/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import BaseTextButton, {
	IBaseTextButtonProps,
	withTextButtonStyles,
} from './BaseTextButton';

export function PrimaryButton({ children, ...props }: IBaseTextButtonProps) {
	return (
		<BaseTextButton variant="green" {...props}>
			{children}
		</BaseTextButton>
	);
}

export const PrimaryButtonWithStyles = withTextButtonStyles(PrimaryButton);
