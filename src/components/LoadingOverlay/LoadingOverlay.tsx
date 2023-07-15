import { Backdrop, Box, CircularProgress, Dialog } from '@mui/material';
import * as React from 'react';

const LoadingOverlay = ({ waiting }: LoadingOverlayProps) => {
	return (
		<Backdrop open={waiting}>
			<CircularProgress size={50} />
		</Backdrop>
	);
};

export default LoadingOverlay;

interface LoadingOverlayProps {
	waiting: boolean;
}
