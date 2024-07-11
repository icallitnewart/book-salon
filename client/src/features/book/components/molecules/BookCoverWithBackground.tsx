import React from 'react';

import BookCoverImage from '../atoms/BookCoverImage';
import ImageBackground from '../atoms/ImageBackground';

interface IBookCoverWithBackgroundProps {
	src?: string;
	alt?: string;
	$width?: string;
	$imgWidth?: string;
}

function BookCoverWithBackground({
	src,
	alt,
	$width = '500px',
	$imgWidth,
}: IBookCoverWithBackgroundProps): JSX.Element {
	return (
		<ImageBackground $width={$width}>
			<BookCoverImage
				src={src}
				alt={alt}
				$boxShadow="20px 20px 30px rgba(0, 0, 0, 0.2)"
				$width={$imgWidth}
			/>
		</ImageBackground>
	);
}

export default BookCoverWithBackground;
