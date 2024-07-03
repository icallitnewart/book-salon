export interface IUserInputProps {
	type: string;
	id: string;
	name: string;
	value: string;
	placeholder?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IUserInputFieldProps extends IUserInputProps {
	label: string;
	error: string;
}
