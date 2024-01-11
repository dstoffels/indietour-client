import { Box, List, ListSubheader, Paper } from '@mui/material';
import { useGlobals } from 'context/GlobalContext';
import { useTheme } from 'context/ThemeContext';
import * as React from 'react';
import { useState, useEffect } from 'react';
import NewTimeslotForm from '../NewTimeslotForm/NewTimeslotForm';
import useSchedule from 'hooks/useSchedule';
import ScheduleItem from '../ScheduleItem/ScheduleItem';

const DrawerContents = () => {
	const { headerHeight, footerHeight } = useTheme();
	const { scheduleDrawerRef } = useGlobals();
	const { timeslots } = useSchedule();

	const timeslotItems = timeslots.map((timeslot) => (
		<ScheduleItem key={timeslot.id} timeslot={timeslot} />
	));

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
				<List subheader={<ListSubheader>{<NewTimeslotForm />}</ListSubheader>}>
					{timeslotItems}
				</List>
			</Paper>
		</Box>
	);
};

export default DrawerContents;
