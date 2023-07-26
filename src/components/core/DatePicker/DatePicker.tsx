import { Button, Paper, Popover, Typography } from '@mui/material';
import { TourDate } from 'context/dateContext';
import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { DateCalendar, StaticDatePicker } from '@mui/x-date-pickers';

interface DatePickerProps {
	value: string;
	onChange: (date: string | null) => void;
	tourdates: TourDate[];
}

const DatePicker = ({ value, onChange, tourdates = [] }: DatePickerProps) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);

	const handleOpen: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleChange = (newValue: string | null) => onChange(newValue);

	const handleDisableDates = (day: string) => {
		const dates = tourdates.map(({ date }) => date);
		return dates.includes(dayjs(day).format('YYYY-MM-DD'));
	};

	return (
		<>
			<Button onClick={handleOpen} variant="text">
				<Typography variant="caption">{dayjs(value).format('ddd')}</Typography>
				<Typography>{dayjs(value).format('MMM DD')}</Typography>
			</Button>
			<Popover
				open={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				anchorEl={anchorEl}
			>
				<Paper elevation={3}>
					<DateCalendar
						value={value}
						onChange={handleChange}
						showDaysOutsideCurrentMonth
						shouldDisableDate={handleDisableDates}
					/>
				</Paper>
			</Popover>
		</>
	);
};

export default DatePicker;
