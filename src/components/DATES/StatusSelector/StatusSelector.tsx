import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	Typography,
} from '@mui/material';
import EditField from 'components/core/EditField/EditField';
import SideStack from 'components/core/SideStack/SideStack';
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
		<SideStack justifyContent="start">
			<Stack flexGrow={1}>
				<FormControl variant="outlined" fullWidth>
					<InputLabel color="info">Status</InputLabel>
					<Select
						fullWidth
						variant="outlined"
						label="Status"
						value={activeDate?.status}
						onChange={handleChange}
					>
						{optionItems}
					</Select>
				</FormControl>
			</Stack>
			{activeDate?.status === 'HOLD' && (
				<Box maxWidth={90}>
					<EditField
						label="Hold"
						value={activeDate.hold || 0}
						onChange={updateTourdate}
						name="hold"
						type="number"
					/>
				</Box>
			)}
		</SideStack>
	);
};

export default StatusSelector;
