export interface IReviewTag {
	id: number;
	text: string;
}

export type IReviewTags = IReviewTag[];

export interface IBookReview {
	id: number;
	nickname: string;
	title: string;
	content: string;
	date: string;
}
