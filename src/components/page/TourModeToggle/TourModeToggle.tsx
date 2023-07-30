import { ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';

const BookingToggle = ({}) => {
	const { pathname, query } = useRouter();
	const date_id = query.date_id;
	const dateIdQuery = date_id ? `?date_id=${date_id}` : '';

	const [mode, setMode] = useState<string>(pathname);

	useEffect(() => {}, [mode]);

	const { push } = useRouter();

	const handleChange = (e: React.MouseEvent<HTMLElement>, value: '/tour' | '/book') =>
		setMode(value);

	return (
		<ToggleButtonGroup value={mode} onChange={handleChange} exclusive color="info">
			<ToggleButton value={`/tour`} onClick={() => push(`/tour${dateIdQuery}`)}>
				<Tooltip title="Switch to Tour Mode">
					<span>Tour</span>
				</Tooltip>
			</ToggleButton>
			<ToggleButton value={`/book`} onClick={() => push(`/book${dateIdQuery}`)}>
				<Tooltip title="Switch to Booking Mode">
					<span>Book</span>
				</Tooltip>
			</ToggleButton>
		</ToggleButtonGroup>
	);
};

export default BookingToggle;
