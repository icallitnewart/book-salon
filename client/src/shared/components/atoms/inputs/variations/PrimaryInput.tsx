/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import BaseInput, { IInputProps, withInputStyles } from './BaseInput';

export function PrimaryInput({ variant, ...props }: IInputProps) {
	return <BaseInput variant="primary" {...props} />;
}

export const PrimaryInputWithStyles = withInputStyles(PrimaryInput);
