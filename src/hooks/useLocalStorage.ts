import { useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string): [T | null, (value: T) => void] => {
	if (typeof window === 'undefined') {
		return [null, (value: T) => {}];
	}

	const storedValue = localStorage.getItem(key);

	const [value, setValue] = useState<T | null>(storedValue && JSON.parse(storedValue));

	const handleStorageChange = (event: StorageEvent) => {
		console.log(event);
		if (event.key === key) {
			event.newValue && setValue(JSON.parse(event.newValue));
		}
	};

	useEffect(() => {
		window.addEventListener('storage', handleStorageChange);

		return () => window.removeEventListener('storage', handleStorageChange);
	}, []);

	function updateValue(value: T) {
		setValue(value);
		localStorage.setItem(key, JSON.stringify(value));
	}

	return [value, updateValue];
};

export default useLocalStorage;
