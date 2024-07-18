export const isInRange = (value: number, min: number, max: number): boolean =>
	value >= min && value <= max;

export const testRegex = {
	isbn: (isbn: string) => {
		const regex = /^[0-9]{13}$/;
		return regex.test(isbn);
	},
};
