import { useState } from 'react';

function useInput(initialValue = '') {
	const [value, setValue] = useState(initialValue);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setValue(e.target.value);
	};

	const resetValue = () => {
		setValue('');
	};

	return {
		value,
		handleChange,
		resetValue,
	};
}

export default useInput;
