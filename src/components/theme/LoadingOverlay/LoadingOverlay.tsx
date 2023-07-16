import { Backdrop, Box, CircularProgress, Dialog } from '@mui/material';
import { useEffect, useState } from 'react';

const LoadingOverlay = ({ loading }: LoadingOverlayProps) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		let timer;
		if (loading) {
			timer = setTimeout(() => {
				setOpen(true);
			}, 200);
		} else {
			setOpen(false);
			clearTimeout(timer);
		}

		return () => clearTimeout(timer);
	}, [loading]);

	return (
		<Backdrop open={open}>
			<CircularProgress size={50} />
		</Backdrop>
	);
};

export default LoadingOverlay;

interface LoadingOverlayProps {
	loading: boolean;
}
