import { FormControlLabel, Switch } from '@mui/material';
import { useDates } from 'context/DateContext';
import * as React from 'react';

const PublishDateSwitch = ({}) => {
	const { activeDate, updateTourdate } = useDates();

	const handleClick = () => {
		updateTourdate({ is_published: !activeDate?.is_published });
	};

	return (
		<FormControlLabel
			control={<Switch checked={activeDate?.is_published} onClick={handleClick} />}
			label="Published"
		/>
	);
};

export default PublishDateSwitch;
