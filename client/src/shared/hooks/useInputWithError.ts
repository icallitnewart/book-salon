/* eslint-disable @typescript-eslint/default-param-last */
import { useCallback, useEffect, useRef, useState } from 'react';

function useInputWithError(
	initialValue = '',
	validate: (value: string) => string,
) {
	const isTouchedRef = useRef(false);
	const isValidRef = useRef(false);
	const [value, setValue] = useState(initialValue);
	const [error, setError] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		if (!isTouchedRef.current) isTouchedRef.current = true;
	};

	const validateInput = useCallback(() => {
		if (!validate) return;

		const errMsg = validate(value);
		if (errMsg) {
			isValidRef.current = false;
			setError(errMsg);
		} else {
			isValidRef.current = true;
			setError('');
		}
	}, [validate, value]);

	useEffect(() => {
		if (isTouchedRef.current) {
			validateInput();
		}
	}, [value, validateInput]);

	return {
		value,
		error,
		setError,
		handleChange,
		validateInput,
		isValidRef,
	};
}

export default useInputWithError;
