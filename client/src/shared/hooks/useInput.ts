import { useState } from 'react';

function useInput(initialValue = '') {
	const [value, setValue] = useState(initialValue);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setValue(e.target.value);
	};

	return {
		value,
		handleChange,
	};
}

export default useInput;
