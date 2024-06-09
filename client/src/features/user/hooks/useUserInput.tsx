import { useEffect, useState } from 'react';

function useUserInput(
	initialValue: string,
	// validate: (value: string) => string,
) {
	const [value, setValue] = useState(initialValue);
	const [error, setError] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	useEffect(() => {
		if (value) {
			// const errMsg = validate(value);
			const errMsg = 'test';
			if (errMsg) setError(errMsg);
		}
	}, [value]);

	return {
		value,
		error,
		handleChange,
	};
}

export default useUserInput;
