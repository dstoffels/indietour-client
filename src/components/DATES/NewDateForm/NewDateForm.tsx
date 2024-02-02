import ButtonForm from 'components/core/ButtonForm/ButtonForm';
import DatePicker from 'components/core/DatePicker/DatePicker';
import { TourDate, useDates } from 'context/DateContext';
import * as React from 'react';
import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Add } from '@mui/icons-material';
import PlaceSelector from 'components/core/PlaceSelector/PlaceSelector';
import { Typography } from '@mui/material';
import { PlaceMin } from 'components/core/PlaceSelector/PlaceSelectorOption';

export interface NewDateFormProps {
	defaultDateFields?: TourDate;
	disableDuplicateDates?: boolean;
}

export type NewDatePropsWithChildren = NewDateFormProps & React.PropsWithChildren;

const NewDateForm = ({ defaultDateFields, disableDuplicateDates }: NewDateFormProps) => {
	const { dates, createTourdate } = useDates();

	const existingDates = disableDuplicateDates ? dates.map(({ date }) => date as string) : [];

	const [date, setDate] = useState<Dayjs>(dayjs());
	const [place, setPlace] = useState<PlaceMin | null>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		await createTourdate({
			...defaultDateFields,
			date: date.format('YYYY-MM-DD'),
			place_id: place?.place_id,
		});

		reset();
	};

	const reset = () => {
		getNextDate();
		setPlace(null);
	};

	function getNextDate() {
		const nextDate = dayjs(existingDates[existingDates.length - 1]).add(1, 'day');
		nextDate && setDate(nextDate);
	}

	useEffect(() => {
		reset();
	}, [dates]);

	return (
		<ButtonForm
			btnIcon={<Add />}
			btnColor="primary"
			btnText="Add Tour Date"
			submitBtnTxt="Add Tour Date"
			onSubmit={handleSubmit}
			onClose={reset}
		>
			<DatePicker
				value={date}
				onChange={(newValue) => setDate(newValue as Dayjs)}
				existingDates={existingDates}
			/>
			{/* <PlaceSelector value={place} onChange={setPlace} required /> */}
		</ButtonForm>
	);
};

export default NewDateForm;
