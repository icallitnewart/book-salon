/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { TextBlock } from './TextElements';

import { ITextProps } from './BaseText';

interface ISanitisedHTMLProps extends ITextProps {
	html?: string;
}

function SanitisedHTML({ html, ...props }: ISanitisedHTMLProps) {
	const cleanHtml = useMemo(() => {
		return html ? DOMPurify.sanitize(html) : '';
	}, [html]);

	return (
		<TextBlock dangerouslySetInnerHTML={{ __html: cleanHtml }} {...props} />
	);
}

export default SanitisedHTML;
