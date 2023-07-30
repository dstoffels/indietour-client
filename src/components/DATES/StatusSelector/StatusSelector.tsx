import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { TourDateStatusOptions, useDates } from 'context/dateContext';
import * as React from 'react';
import { useState } from 'react';

const StatusSelector = () => {
	const { activeDate, statusOptions, updateTourdate } = useDates();

	const optionItems = statusOptions.map((option) => (
		<MenuItem key={`status-${option}`} value={option}>
			{option}
		</MenuItem>
	));

	const handleChange = (e: SelectChangeEvent) => {
		updateTourdate({
			status: e.target.value as TourDateStatusOptions,
		});
	};

	return (
		<Box>
			<FormControl>
				<InputLabel>Status</InputLabel>
				<Select label="Status" value={activeDate?.status} onChange={handleChange}>
					{optionItems}
				</Select>
			</FormControl>
		</Box>
	);
};

export default StatusSelector;
