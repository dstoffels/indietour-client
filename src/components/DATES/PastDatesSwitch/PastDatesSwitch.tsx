import { Box, Switch, Typography } from '@mui/material';
import SideStack from 'components/core/SideStack/SideStack';
import { useAuth } from 'context/AuthContext';
import { useDates } from 'context/DateContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

const PastDatesSwitch = () => {
	const { user, updateUser } = useAuth();
	const { fetchTourDates } = useDates();

	const togglePastDates = async () => {
		await updateUser({ show_past_dates: !user?.show_past_dates });
	};

	useEffect(() => {
		fetchTourDates();
	}, [user?.show_past_dates]);

	return (
		<SideStack alignItems="center">
			<Typography>Past Dates</Typography>
			<Switch checked={user?.show_past_dates} onChange={togglePastDates} />
		</SideStack>
	);
};

export default PastDatesSwitch;
