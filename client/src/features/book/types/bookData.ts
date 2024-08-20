export interface IBookDetail {
	title: string;
	author: string;
	category: string;
	publisher: string;
	pubDate: string;
	isbn: string;
	description: string;
	cover: string;
	link?: string;
}

export type IBookDetailPartial = Partial<IBookDetail>;

export type IBookProfile = Omit<IBookDetail, 'description'>;

export type IBookProfilePreview = Pick<
	IBookProfile,
	'title' | 'cover' | 'link'
> & { author?: string };

export interface IBookData extends Omit<IBookDetail, 'category' | 'isbn'> {
	categoryName: string;
	isbn13: string;
}

export interface IBookPageOptions {
	maxResults?: number;
	startPage?: number;
}
