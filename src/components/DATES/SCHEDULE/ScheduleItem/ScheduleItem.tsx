import { AirportShuttle, Flight, Handshake, Schedule } from '@mui/icons-material';
import { Box, ListItem, ListItemButton, Stack, Typography } from '@mui/material';
import SideStack from 'components/core/SideStack/SideStack';
import { useTheme } from 'context/ThemeContext';
import { Timeslot } from 'hooks/useSchedule';
import * as React from 'react';
import { useState, useEffect } from 'react';

interface ScheduleItemProps {
	timeslot: Timeslot;
}

const getIcon = (timeslot: Timeslot) => {
	switch (timeslot.type) {
		case 'Event':
			return <Schedule fontSize="small" />;
		case 'Flight':
			return <Flight fontSize="small" />;
		case 'Meeting':
			return <Handshake fontSize="small" />;
		case 'Travel':
			return <AirportShuttle fontSize="small" />;
	}
};

const ScheduleItem = ({ timeslot }: ScheduleItemProps) => {
	const { theme } = useTheme();

	const icon = getIcon(timeslot);

	return (
		<ListItem disablePadding>
			<ListItemButton>
				<Box display="flex" gap={2} alignItems="center" flexDirection="row">
					{icon}
					<Box>
						<Typography color={theme.palette.primary.main} variant="caption">
							{timeslot.start_time}
							{timeslot.end_time && ' - ' + timeslot.end_time}
						</Typography>
						<Typography>{timeslot.title}</Typography>
						<Typography>
							{timeslot.origin?.name} {timeslot.destination && ' - ' + timeslot.destination?.name}
						</Typography>
					</Box>
				</Box>
			</ListItemButton>
		</ListItem>
	);
};

export default ScheduleItem;
