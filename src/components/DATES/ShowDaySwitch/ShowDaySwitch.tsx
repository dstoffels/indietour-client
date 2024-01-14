import { FormControlLabel, Switch } from '@mui/material';
import { useDates } from 'context/DateContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

const ShowDaySwitch = ({}) => {
	const { activeDate, updateTourdate } = useDates();

	const handleClick = () => {
		updateTourdate({ is_show_day: !activeDate?.is_show_day });
	};

	return (
		<FormControlLabel
			control={<Switch checked={activeDate?.is_show_day} onClick={handleClick} />}
			label="Show Day"
		/>
	);
};

export default ShowDaySwitch;
