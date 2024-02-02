import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import VenueAutocomplete from 'components/VENUES/VenueAutocomplete/VenueAutocomplete';
import VenueForm from 'components/VENUES/VenueForm/VenueForm';
import ButtonForm from 'components/core/ButtonForm/ButtonForm';
import useForm from 'hooks/useForm';
import useShows from 'hooks/useShows';
import useVenues from 'hooks/useVenues';
import React, { useState, useEffect } from 'react';
import { Show } from '../types';

const ShowForm = ({}) => {
	const { createShow } = useShows();
	const [venueId, setVenueId] = useState('');

	const handleChange = (venue_id: string) => setVenueId(venue_id);

	const handleSubmit = async () => {
		await createShow({ venue_id: venueId });
	};

	return (
		<ButtonForm btnText="Add Show" submitBtnTxt="Add Show" onSubmit={handleSubmit}>
			<VenueAutocomplete onSelect={handleChange} />
		</ButtonForm>
	);
};

export default ShowForm;
