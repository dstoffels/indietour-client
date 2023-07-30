import { ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';

const BookingToggle = ({}) => {
	const { push, pathname } = useRouter();

	const handleChange = (e: React.MouseEvent<HTMLElement>, value: '/tour' | '/book') => {
		const query = value === '/tour' ? { status: 'confirmed,cancelled' } : {};
		pathname !== value && push({ pathname: value, query });
	};

	return (
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
	);
};

export default BookingToggle;
