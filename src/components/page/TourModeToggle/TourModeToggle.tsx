import { ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import { useAuth } from 'context/authContext';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';

const BookingToggle = ({}) => {
	const { push, pathname } = useRouter();
	const { user } = useAuth();

	const handleChange = (e: React.MouseEvent<HTMLElement>, value: '/tour' | '/book') => {
		pathname !== value && push(value);
	};

	return (
		user && (
			<ToggleButtonGroup value={pathname} exclusive color="info">
				<ToggleButton value={`/tour`} onClick={handleChange}>
					<Tooltip title="Switch to Tour Mode">
						<span>Tour</span>
					</Tooltip>
				</ToggleButton>
				<ToggleButton value={`/book`} onClick={handleChange}>
					<Tooltip title="Switch to Booking Mode">
						<span>Book</span>
					</Tooltip>
				</ToggleButton>
			</ToggleButtonGroup>
		)
	);
};

export default BookingToggle;
