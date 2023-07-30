import { Box, Grid, useTheme } from '@mui/material';
import { useDates } from 'context/dateContext';
import { PropsWithChildren } from 'react';
import * as React from 'react';
import { useState, useEffect } from 'react';

interface MainProps extends PropsWithChildren {
	drawerWidth?: number;
	header?: React.ReactNode;
}

const Main = ({ drawerWidth, header, children }: MainProps) => {
	const { drawerOpen } = useDates();
	const theme = useTheme();

	const marginLeft = drawerOpen ? `${drawerWidth}px` : 0;

	const transition = !drawerOpen
		? theme.transitions.create('margin', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
		  })
		: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
		  });

	return (
		drawerWidth && (
			<Box
				width="100%"
				marginLeft={marginLeft}
				padding={1}
				sx={{
					transition,
				}}
			>
				<Box width="100%">{header}</Box>
				<Grid container spacing={1}>
					{children}
				</Grid>
			</Box>
		)
	);
};

export default Main;
