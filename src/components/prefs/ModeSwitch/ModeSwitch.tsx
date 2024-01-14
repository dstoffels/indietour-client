import { Box, Typography } from '@mui/material';
import BaseMenuItem from 'components/core/menu/BaseMenuItem/BaseMenuItem';
import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';
import * as React from 'react';

const ModeSwitch = ({}) => {
	const { user, updateUser, loaded } = useAuth();
	const { push } = useRouter();

	const toggleBookingMode = async () => {
		await updateUser({ booking_mode: !user?.booking_mode });
		const page = user?.booking_mode ? '/tour' : '/book';
		loaded && push(page);
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
