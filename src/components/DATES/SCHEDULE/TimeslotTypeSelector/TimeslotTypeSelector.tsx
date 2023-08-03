import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
} from '@mui/material';
import useSchedule, { Timeslot, TimeslotType } from 'hooks/useSchedule';
import * as React from 'react';
import { useState, useEffect } from 'react';

export interface TimeslotTypeSelectorProps {
	name: string;
	value: TimeslotType;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => any;
}

const TimeslotTypeSelector = ({ name, value, onChange }: TimeslotTypeSelectorProps) => {
	const { types, fetchTimeslotTypes } = useSchedule();

	const handleChange = (event: SelectChangeEvent) => {
		onChange && onChange(event as React.ChangeEvent<HTMLInputElement>);
		!onChange && console.warn('TimeslotTypeSelector requires an onChange handler.');
	};

	useEffect(() => {
		fetchTimeslotTypes();
	}, []);

	const typeItems = types.map((type: TimeslotType) => (
		<MenuItem key={`ts-type-${type}`} value={type}>
			<Typography>{type}</Typography>
		</MenuItem>
	));

	return (
		types.length && (
			<FormControl variant="outlined" fullWidth>
				<InputLabel>Type</InputLabel>
				<Select
					fullWidth
					label="Type"
					variant="outlined"
					value={value}
					name={name}
					onChange={handleChange}
				>
					{typeItems}
				</Select>
			</FormControl>
		)
	);
};

export default TimeslotTypeSelector;
