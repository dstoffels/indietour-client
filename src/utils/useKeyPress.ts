import { useEffect, useState, useCallback } from 'react';

function useKeyPress(targetKey: string, callback: () => void) {
	const [keyPressed, setKeyPressed] = useState(false);

	const keyDownHandler = useCallback(
		({ key }: any) => {
			if (key === targetKey) {
				setKeyPressed(true);
			}
		},
		[targetKey],
	);

	const keyUpHandler = useCallback(
		({ key }: any) => {
			if (key === targetKey) {
				setKeyPressed(false);
			}
		},
		[targetKey],
	);

	useEffect(() => {
		window.addEventListener('keydown', keyDownHandler);
		window.addEventListener('keyup', keyUpHandler);
		return () => {
			window.removeEventListener('keydown', keyDownHandler);
			window.removeEventListener('keyup', keyUpHandler);
		};
	}, [keyDownHandler, keyUpHandler]);

	useEffect(() => {
		keyPressed && callback();
	}, [keyPressed]);
}

export default useKeyPress;