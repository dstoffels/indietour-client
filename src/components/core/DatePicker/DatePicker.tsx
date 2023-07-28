import { Button, Paper, Popover, Stack, Typography } from '@mui/material';
import { TourDate } from 'context/dateContext';
import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DateCalendar, StaticDatePicker } from '@mui/x-date-pickers';

interface DatePickerProps {
	value: Dayjs | null;
	onChange: (date: Dayjs | null) => void;
	existingDates: string[];
}

const DatePicker = ({ value, onChange, existingDates = [] }: DatePickerProps) => {
	const handleDisableDates = (day: Dayjs) => existingDates.includes(day.format('YYYY-MM-DD'));

	return (
		<DateCalendar<Dayjs>
			value={value}
			onChange={onChange}
			showDaysOutsideCurrentMonth
			shouldDisableDate={handleDisableDates}
		/>
	);
};

export default DatePicker;
