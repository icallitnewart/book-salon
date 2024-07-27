export interface IReviewTag {
	id: string;
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
