import { Typography } from '@mui/material';
import { useTheme } from 'context/hemeContext';
import * as React from 'react';

const FieldTitle = ({ children }: React.PropsWithChildren) => {
	const { theme } = useTheme();
	return (
		<Typography color={theme.palette.info.main} variant="overline">
			{children}
		</Typography>
	);
};

export default FieldTitle;
