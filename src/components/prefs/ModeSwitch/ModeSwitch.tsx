import { Box, Typography } from '@mui/material';
import BaseMenuItem from 'components/core/menu/BaseMenuItem/BaseMenuItem';
import { useAuth } from 'context/AuthContext';
import { useDates } from 'context/DateContext';
import { useRouter } from 'next/router';
import * as React from 'react';

const ModeSwitch = ({}) => {
	const { activeDate } = useDates();
	const { user, updateUser, loaded } = useAuth();
	const { push, query } = useRouter();

	const toggleBookingMode = async () => {
		await updateUser({ booking_mode: !user?.booking_mode });
		const pathname = user?.booking_mode ? '/tour' : '/book';
		loaded && push({ pathname, query: activeDate?.is_published ? query : {} });
	};

	if (!user?.is_tour_admin) return null;

	const mode = user.booking_mode ? 'Tour' : 'Booking';

	return (
		<BaseMenuItem onClick={toggleBookingMode}>
			<Typography>Switch to {mode} Mode</Typography>
		</BaseMenuItem>
	);
};

export default ModeSwitch;
