import { useEffect, useRef, useState } from 'react';

function useUserInput(
	initialValue: string,
	validate?: (value: string) => string,
) {
	const isTouchedRef = useRef(false);
	const [value, setValue] = useState(initialValue);
	const [error, setError] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		if (!isTouchedRef.current) isTouchedRef.current = true;
	};

	useEffect(() => {
		// TODO: validate 제거 예정
		if (isTouchedRef.current && validate) {
			const errMsg = validate(value);
			if (errMsg) setError(errMsg);
			else setError('');
		}
	}, [value, validate]);

	return {
		value,
		error,
		setError,
		handleChange,
	};
}

export default useUserInput;
