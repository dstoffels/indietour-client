import { Backdrop, Box, CircularProgress, Dialog } from '@mui/material';
import * as React from 'react';

const LoadingOverlay = ({ loading }: LoadingOverlayProps) => {
	return (
		<Backdrop open={loading}>
			<CircularProgress size={50} />
		</Backdrop>
	);
};

export default LoadingOverlay;

interface LoadingOverlayProps {
	loading: boolean;
}
