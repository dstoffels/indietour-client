import { Autocomplete, TextField, debounce } from '@mui/material';
import useVenues, { Venue, VenueParams } from 'hooks/useVenues';
import * as React from 'react';
import { useState, useEffect } from 'react';

const VenueAutocomplete = ({}) => {
	const { selectedVenue, venues, setVenues, setSelectedVenue, fetchVenues } = useVenues();
	const [inputValue, setInputValue] = useState('');

	const handleChange = (e: any, newValue: Venue | null) => {
		setSelectedVenue(newValue);
	};

	const fetch = React.useMemo(
		() =>
			debounce((inputValue: string) => {
				fetchVenues(new VenueParams(inputValue));
			}, 300),
		[],
	);

	useEffect(() => {
		inputValue && fetch(inputValue);
		!inputValue && setVenues([]);
	}, [inputValue]);

	return (
		<Autocomplete
			freeSolo
			options={venues}
			value={selectedVenue}
			onChange={handleChange}
			inputValue={inputValue}
			getOptionLabel={(option: Venue) => option.place?.name}
			autoComplete
			onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
			renderInput={(params) => <TextField variant="standard" {...params} label="Venue" />}
		/>
	);
};

export default VenueAutocomplete;
