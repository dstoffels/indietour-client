import { Add, AddLocation, LocationOn } from '@mui/icons-material';
import { Autocomplete, Box, Stack, TextField, Tooltip, Typography, debounce } from '@mui/material';
import SideStack from 'components/core/SideStack/SideStack';
import useVenues, { Venue, VenueParams } from 'hooks/useVenues';
import * as React from 'react';
import { useState, useEffect } from 'react';
import VenueForm from '../VenueForm/VenueForm';
import api from 'utils/api';
import PlaceSelectorOption, { PlaceMin } from 'components/core/PlaceSelector/PlaceSelectorOption';

const VenueAutocomplete = ({ onSelect }: VenueAutocompleteProps) => {
	const { selectedVenue, venues, setVenues, setSelectedVenue, fetchVenues } = useVenues();
	const [inputValue, setInputValue] = useState('');
	const [places, setPlaces] = useState<PlaceMin[]>([]);
	const [newVenuePlaceId, setNewVenuePlaceId] = useState<string>('');

	const handleChange = async (e: any, newValue: Venue | PlaceMin | null) => {
		if (newValue?.place_id) {
			setNewVenuePlaceId(newValue.place_id);
		} else {
			newValue = newValue as Venue;
			setSelectedVenue(newValue);
		}
	};

	const handleCloseNewVenue = (venue: Venue | null) => {
		setNewVenuePlaceId('');
		setInputValue('');
		venue && setSelectedVenue(venue);
		onSelect && onSelect(venue?.id as string);
	};

	const fetchVenueOptions = React.useMemo(
		() =>
			debounce(async (inputValue: string) => {
				await fetchVenues(inputValue);
				const response = await api.get(`/places/autocomplete?input=${inputValue}`);
				setPlaces(response.data.predictions);
			}, 300),
		[],
	);

	useEffect(() => {
		inputValue && fetchVenueOptions(inputValue);
		if (!inputValue) {
			setVenues([]);
			setPlaces([]);
		}
	}, [inputValue]);

	const options = [...venues, ...places];

	const handleRenderOption = (props: any, option: any) => {
		if (option.place_id) {
			const duplicate = venues.find((venue) => venue.place?.id === option.place_id);
			if (duplicate || option.types.includes('locality')) return null;
			return <PlaceSelectorOption props={props} option={option} key={option.place_id} />;
		}
		return (
			<li {...props}>
				<SideStack width="100%">
					<Stack>
						<Typography fontWeight="500">{option.place?.name}</Typography>
						<Typography variant="caption">{option.place?.political_address}</Typography>
					</Stack>
					<LocationOn color="success" />
				</SideStack>
			</li>
		);
	};

	return (
		<>
			<Autocomplete
				freeSolo
				options={options}
				value={selectedVenue}
				// @ts-ignore
				onChange={handleChange}
				inputValue={inputValue}
				// @ts-ignore
				getOptionLabel={(option) => option.place?.name || option.structured_formatting.main_text}
				autoComplete
				filterOptions={(venue) => venue}
				onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
				renderInput={(params) => <TextField variant="standard" {...params} label="Venue" />}
				renderOption={handleRenderOption}
			/>
			<VenueForm place_id={newVenuePlaceId} onClose={handleCloseNewVenue} />
		</>
	);
};

export default VenueAutocomplete;

export type VenueAutocompleteProps = {
	onSelect?: (venue_id: string) => void;
};
