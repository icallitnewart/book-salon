export interface IBookProfilePreview {
	title: string;
	author?: string;
	cover: string;
	link?: string;
}

export interface IBookProfile {
	title: string;
	author: string;
	cover: string;
	category: string;
	publisher: string;
	pubDate: string;
	isbn: string;
}
