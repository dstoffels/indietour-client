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
import { TourDate, TourDateStatusOptions, useDates } from 'context/dateContext';
import { useTheme } from 'context/themeContext';
import * as React from 'react';
import { useState } from 'react';

const StatusSelector = () => {
	const { activeDate, statusOptions, updateTourdate } = useDates();

	const optionItems = statusOptions.map((option) => (
		<MenuItem key={`status-${option}`} value={option}>
			<Typography color={getStatusColor(option as TourDateStatusOptions)}>{option}</Typography>
		</MenuItem>
	));

	const handleChange = (e: SelectChangeEvent) => {
		updateTourdate({
			status: e.target.value as TourDateStatusOptions,
		});
	};

	const color = getStatusColor(activeDate?.status as TourDateStatusOptions);

	return (
		<SideStack justifyContent="start">
			<Stack flexGrow={1}>
				<FormControl variant="outlined" fullWidth>
					<InputLabel>
						<Typography color={color}>Status</Typography>
					</InputLabel>
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

export function getStatusColor(status: TourDateStatusOptions) {
	const { theme } = useTheme();

	switch (status) {
		case 'INQUIRED':
			return theme.palette.secondary.main;
		case 'HOLD':
			return theme.palette.info.main;
		case 'CHALLENGED':
			return theme.palette.warning.main;
		case 'OPTION':
			return theme.palette.success.main;
		case 'RELEASED':
			return theme.palette.action.disabled;
		case 'CANCELLED':
			return theme.palette.error.main;
		default:
			return 'inherit';
	}
}
