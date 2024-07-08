import React from 'react';

import BookCoverImage from '../atoms/BookCoverImage';
import ImageBackground from '../atoms/ImageBackground';

interface IBookCoverWithBackgroundProps {
	src?: string;
	alt?: string;
}

function BookCoverWithBackground({
	src,
	alt,
}: IBookCoverWithBackgroundProps): JSX.Element {
	return (
		<ImageBackground $width="500px">
			<BookCoverImage
				src={src}
				alt={alt}
				$boxShadow="20px 20px 30px rgba(0, 0, 0, 0.2)"
			/>
		</ImageBackground>
	);
}

export default BookCoverWithBackground;
