/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import BaseTextButton, {
	IBaseTextButtonProps,
	withTextButtonStyles,
} from './BaseTextButton';

export function SubtleButton({ children, ...props }: IBaseTextButtonProps) {
	return (
		<BaseTextButton variant="grey" {...props}>
			{children}
		</BaseTextButton>
	);
}

export const SubtleButtonWithStyles = withTextButtonStyles(SubtleButton);
