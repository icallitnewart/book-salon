/* eslint-disable no-underscore-dangle */
type WithId<T> = T extends { _id: string }
	? Omit<T, '_id'> & { id: string }
	: T;

export function convertObjectId<T extends Record<string, any>>(
	obj: T,
	nestedFields: string[] = [],
): WithId<T> {
	const convertId = (item: Record<string, any>): Record<string, any> => {
		if (typeof item !== 'object' || item === null) {
			return item;
		}

		const result = { ...item };
		if ('_id' in result) {
			result.id = result._id;
			delete result._id;
		}

		if (nestedFields && nestedFields.length) {
			nestedFields.forEach(field => {
				if (field in result && typeof result[field] === 'object') {
					result[field] = convertId(result[field]);
				}
			});
		}

		return result;
	};

	return convertId(obj) as WithId<T>;
}

export function stripHtmlTags(html: string): string {
	const refinedHtml = html
		.replace(/<\/p>/g, '</p> ')
		.replace(/<\/li>/g, '</li> ');
	const doc = new DOMParser().parseFromString(refinedHtml, 'text/html');
	return doc.body.textContent || '';
}

interface IPrepareTextForHighlightProps {
	text: string;
	searchTerm: string;
	startLength: number;
}

export function prepareTextForHighlight({
	text,
	searchTerm,
	startLength,
}: IPrepareTextForHighlightProps): string | string[] {
	const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());
	const isSearchTerm = index !== -1;
	if (!isSearchTerm) return text;

	const startIdx = Math.max(0, index - startLength);
	let preview = text.slice(startIdx);

	if (startIdx > 0) preview = `...${preview}`;

	const parts = preview.split(new RegExp(`(${searchTerm})`, 'gi'));
	return parts;
}
