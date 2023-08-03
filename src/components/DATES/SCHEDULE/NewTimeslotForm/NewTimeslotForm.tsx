import { Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import useForm from 'hooks/useForm';
import * as React from 'react';
import { useState, useEffect } from 'react';
import TimeslotTypeSelector from '../TimeslotTypeSelector/TimeslotTypeSelector';
import useSchedule, { Timeslot } from 'hooks/useSchedule';
import ButtonForm from 'components/core/ButtonForm/ButtonForm';
import { DesktopTimePicker, TimeField, TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import SideStack from 'components/core/SideStack/SideStack';
import PlaceSelector from 'components/core/PlaceSelector/PlaceSelector';
import { PlaceType } from 'components/core/PlaceSelector/PlaceSelectorOption';

dayjs.extend(customParseFormat);

const roundTime = (time: Dayjs) => {
	const minutes = time.minute();
	const m = minutes % 15;
	time = m >= 8 ? time.set('minute', minutes + 15 - m) : time.set('minute', minutes - m);
	return time;
};

const findNextTime = (timeslots: Timeslot[]) => {
	const last = timeslots[timeslots.length - 1];
	let time = last ? dayjs(last.start_time, 'HH:mm') : dayjs();
	time = roundTime(time);
	return time.format('HH:mm');
};

const NewTimeslotForm = ({}) => {
	const { createTimeslot, timeslots } = useSchedule();
	const initData: Timeslot = {
		type: 'Event',
		title: '',
		start_time: findNextTime(timeslots),
		start_after_midnight: false,
		end_time: findNextTime(timeslots),
		end_after_midnight: false,
	};

	const [origin, setOrigin] = useState<PlaceType | null>(null);
	const [destination, setDestination] = useState<PlaceType | null>(null);

	const { formData, handleChange, handleSubmit, reset } = useForm(initData, createTimeslot);

	const handleTime = (name: string, value: Dayjs | null) => {
		handleChange({
			target: { name, value: dayjs(value).format('HH:mm').toString() },
		} as React.ChangeEvent<HTMLInputElement>);
	};

	const handleStart = (value: Dayjs | null) => handleTime('start_time', value);
	const handleEnd = (value: Dayjs | null) => handleTime('end_time', value); // validate to after starttime

	const handlePlace = (name: string, place_id: string) => {
		handleChange({ target: { name, value: place_id } } as React.ChangeEvent<HTMLInputElement>);
	};

	useEffect(() => {
		origin && handlePlace('origin_id', origin.place_id);
	}, [origin]);

	useEffect(() => {
		destination && handlePlace('destination_id', destination.place_id);
	}, [destination]);

	return (
		<ButtonForm
			btnText="Add Timeslot"
			submitBtnTxt="Add Timeslot"
			onSubmit={handleSubmit}
			onClose={reset}
		>
			<Stack spacing={2}>
				<TimeslotTypeSelector name="type" value={formData.type} onChange={handleChange} />
				<TextField
					required
					variant="standard"
					autoFocus
					label="Title"
					name="title"
					value={formData.title}
					onChange={handleChange}
				/>

				{/* START */}

				<SideStack alignItems="end">
					<TimeField<Dayjs>
						required
						variant="standard"
						label="Start Time"
						value={dayjs(formData.start_time, 'HH:mm')}
						onChange={handleStart}
						format="HH:mm"
						onBlur={() => handleStart(roundTime(dayjs(formData.start_time, 'HH:mm')))}
						minutesStep={15}
					/>
					<FormControlLabel
						label={<Typography variant="caption">Next Day</Typography>}
						labelPlacement="start"
						sx={{ alignSelf: 'flex-end' }}
						control={
							<Checkbox
								checked={formData.start_after_midnight}
								name="start_after_midnight"
								onChange={handleChange}
							/>
						}
					/>
				</SideStack>
				<PlaceSelector label="Origin" value={origin} onChange={setOrigin} />

				{/* END */}

				<SideStack alignItems="end">
					<TimeField<Dayjs>
						variant="standard"
						label="End Time"
						value={dayjs(formData.end_time, 'HH:mm')}
						onChange={handleEnd}
						format="HH:mm"
						minutesStep={15}
						onBlur={() => handleEnd(roundTime(dayjs(formData.end_time, 'HH:mm')))}
					/>
					<FormControlLabel
						label={<Typography variant="caption">Next Day</Typography>}
						labelPlacement="start"
						sx={{ alignSelf: 'flex-end' }}
						control={
							<Checkbox
								checked={formData.end_after_midnight}
								name="end_after_midnight"
								onChange={handleChange}
							/>
						}
					/>
				</SideStack>
				<PlaceSelector label="Destination" value={destination} onChange={setDestination} />
			</Stack>
		</ButtonForm>
	);
};

export default NewTimeslotForm;
