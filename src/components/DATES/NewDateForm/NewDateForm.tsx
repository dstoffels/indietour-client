import ButtonForm from 'components/core/ButtonForm/ButtonForm';
import DatePicker from 'components/core/DatePicker/DatePicker';
import { TourDate, useDates } from 'context/dateContext';
import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Add } from '@mui/icons-material';
import PlaceSelector from 'components/core/PlaceSelector/PlaceSelector';
import { Typography } from '@mui/material';
import { PlaceType } from 'components/core/PlaceSelector/PlaceSelectorOption';

export interface NewDateFormProps {
	defaultDateFields?: TourDate;
	disableDuplicateDates?: boolean;
}

export type NewDatePropsWithChildren = NewDateFormProps & React.PropsWithChildren;

const NewDateForm = ({ defaultDateFields, disableDuplicateDates }: NewDateFormProps) => {
	const { dates, createTourdate } = useDates();
	const existingDates = disableDuplicateDates ? dates.map(({ date }) => date as string) : [];

	const [date, setDate] = useState<Dayjs>(dayjs());
	const [place, setPlace] = useState<PlaceType | null>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		await createTourdate({
			...defaultDateFields,
			date: date.format('YYYY-MM-DD'),
			place_id: place?.place_id,
		});
	};

	const reset = () => {
		setDate(dayjs());
		setPlace(null);
	};

	return (
		<ButtonForm
			btnIcon={<Add />}
			btnColor="primary"
			btnText="Add tour Date"
			submitBtnTxt="Add Date"
			onSubmit={handleSubmit}
			iconBtns
			onClose={reset}
		>
			<Typography variant="h6">Add Tour Date</Typography>
			<DatePicker
				value={date}
				onChange={(newValue) => setDate(newValue as Dayjs)}
				existingDates={existingDates}
			/>
			<PlaceSelector value={place} onChange={setPlace} />
		</ButtonForm>
	);
};

export default NewDateForm;
