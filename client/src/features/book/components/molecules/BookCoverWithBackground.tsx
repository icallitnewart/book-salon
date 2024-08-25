import React from 'react';

import BookCoverImage from '../atoms/BookCoverImage';
import BookImageBackground from '../atoms/BookImageBackground';

interface IBookCoverWithBackgroundProps {
	src?: string;
	alt?: string;
	$width?: string;
	$height?: string;
	$imgWidth?: string;
	$imgHeight?: string;
	$bgBorderRadius?: string;
}

function BookCoverWithBackground({
	src,
	alt,
	$width = '500px',
	$height,
	$imgWidth,
	$imgHeight,
	$bgBorderRadius,
}: IBookCoverWithBackgroundProps): JSX.Element {
	return (
		<BookImageBackground
			$width={$width}
			$height={$height}
			$bgBorderRadius={$bgBorderRadius}
		>
			<BookCoverImage
				src={src}
				alt={alt}
				$boxShadow="20px 20px 30px rgba(0, 0, 0, 0.2)"
				$width={$imgWidth}
				$height={$imgHeight}
			/>
		</BookImageBackground>
	);
}

export default BookCoverWithBackground;
