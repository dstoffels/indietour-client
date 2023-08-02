import { Stack, TextField } from '@mui/material';
import ButtonFormExclusive from 'components/core/ButtonForm/ButtonFormExclusive';
import useForm from 'hooks/useForm';
import * as React from 'react';
import { useState, useEffect } from 'react';
import TimeslotTypeSelector from '../TimeslotTypeSelector/TimeslotTypeSelector';
import useSchedule, { Timeslot } from 'hooks/useSchedule';

const NewTimeslotForm = ({}) => {
	const { createTimeslot } = useSchedule();

	const initData: Timeslot = {
		type: 'Event',
	};

	const { formData, handleChange, handleSubmit, reset } = useForm(initData, createTimeslot);

	return (
		<ButtonFormExclusive
			btnText="Add Timeslot"
			submitBtnTxt="Add Timeslot"
			onSubmit={handleSubmit}
			fieldComponents={
				<Stack spacing={2}>
					<TimeslotTypeSelector name="type" value={formData.type} onChange={handleChange} />
					<TextField />
				</Stack>
			}
		>
			timeslots
		</ButtonFormExclusive>
	);
};

export default NewTimeslotForm;
