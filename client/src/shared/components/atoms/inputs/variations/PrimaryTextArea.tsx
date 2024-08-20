/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import BaseInput, { IInputProps, withInputStyles } from './BaseInput';

export function PrimaryTextarea({ variant, as, ...props }: IInputProps) {
	return <BaseInput variant="primary" as="textarea" {...props} />;
}

export const PrimaryTextareaWithStyles = withInputStyles(PrimaryTextarea);
