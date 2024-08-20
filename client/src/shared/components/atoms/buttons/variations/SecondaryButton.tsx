/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import BaseTextButton, {
	IBaseTextButtonProps,
	withTextButtonStyles,
} from './BaseTextButton';

export function SecondaryButton({ children, ...props }: IBaseTextButtonProps) {
	return (
		<BaseTextButton variant="black" {...props}>
			{children}
		</BaseTextButton>
	);
}

export const SecondaryButtonWithStyles = withTextButtonStyles(SecondaryButton);
