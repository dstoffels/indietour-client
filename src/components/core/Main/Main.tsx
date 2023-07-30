import { Box, useTheme } from '@mui/material';
import { useDates } from 'context/dateContext';
import { PropsWithChildren } from 'react';
import * as React from 'react';
import { useState, useEffect } from 'react';

interface MainProps extends PropsWithChildren {
	drawerWidth?: number;
}

const Main = ({ drawerWidth, children }: MainProps) => {
	const { drawerOpen } = useDates();
	const theme = useTheme();

	return (
		<Box
			flexGrow={1}
			marginLeft={drawerOpen ? `${drawerWidth}px` : 0}
			sx={{
				transition: !drawerOpen
					? theme.transitions.create('margin', {
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.leavingScreen,
					  })
					: theme.transitions.create('margin', {
							easing: theme.transitions.easing.easeOut,
							duration: theme.transitions.duration.enteringScreen,
					  }),
			}}
		>
			{children}
		</Box>
	);
};

export default Main;
