import { Box, List, ListSubheader, Paper } from '@mui/material';
import { useGlobals } from 'context/GlobalContext';
import { useTheme } from 'context/ThemeContext';
import * as React from 'react';
import { useState, useEffect } from 'react';
import NewTimeslotForm from '../NewTimeslotForm/NewTimeslotForm';

const DrawerContents = () => {
	const { headerHeight, footerHeight } = useTheme();
	const { scheduleDrawerRef } = useGlobals();
	return (
		<Box
			ref={scheduleDrawerRef}
			position="relative"
			sx={{
				marginTop: `${headerHeight}px`,
				marginBottom: `${footerHeight}px`,
				height: '100%',
			}}
		>
			<Paper sx={{ height: '100%' }}>
				<List subheader={<ListSubheader>{<NewTimeslotForm />}</ListSubheader>}>Schedule</List>
			</Paper>
		</Box>
	);
};

export default DrawerContents;
