/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import BaseInput, { IInputProps, withInputStyles } from './BaseInput';

export function InvisibleInput({ variant, ...props }: IInputProps) {
	return <BaseInput variant="invisible" {...props} />;
}

export const InvisibleInputWithStyles = withInputStyles(InvisibleInput);
