const padTwoDigits = (num: number): string => {
	return String(num).padStart(2, '0');
};

const formatRelativeTime = (
	year: number,
	month: number,
	day: number,
	date: Date,
): string => {
	const now = new Date();
	const thisYear = now.getFullYear();
	const diffTime = now.getTime() - date.getTime();
	const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

	if (diffDays === 0) {
		return '오늘';
	}

	if (diffDays <= 7) {
		return `${diffDays}일 전`;
	}

	if (year === thisYear) {
		return `${padTwoDigits(month)}월 ${padTwoDigits(day)}일`;
	}

	return `${year}년 ${padTwoDigits(month)}월 ${padTwoDigits(day)}일`;
};

export const formatISODate = (
	isoDate: string,
	isRelativeTime = true,
): string => {
	const date = new Date(isoDate);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	if (isRelativeTime) {
		return formatRelativeTime(year, month, day, date);
	}

	return `${year}년 ${padTwoDigits(month)}월 ${padTwoDigits(day)}일`;
};
