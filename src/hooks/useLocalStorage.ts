import { useEffect, useState } from 'react';

const useLocalStorage = <T>(
	key: string,
	defaultValue = null,
): [T | null, (value: T) => void, boolean] => {
	const [value, setValue] = useState<T | null>(defaultValue);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const item = localStorage.getItem(key);
		item && setValue(JSON.parse(item));
		setLoading(false);
	}, []);

	function updateValue(value: T) {
		setValue(value);
		localStorage.setItem(key, JSON.stringify(value));
	}

	return [value, updateValue, loading];
};

export default useLocalStorage;
