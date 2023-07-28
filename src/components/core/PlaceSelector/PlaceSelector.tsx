import { Autocomplete, TextField, debounce } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import api from 'utils/api';
import PlaceSelectorOption, { PlaceType } from './PlaceSelectorOption';

interface PlaceSelectorProps {
	value: PlaceType | null;
	onChange: (place: PlaceType | null) => void;
}

const PlaceSelector = ({ value, onChange }: PlaceSelectorProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');
	const [options, setOptions] = useState<PlaceType[]>([]);

	const fetchPlaceOptions = React.useMemo(
		() =>
			debounce(async (inputValue: string) => {
				if (inputValue) {
					const response = await api.get(`/places/autocomplete?input=${inputValue}`);
					setOptions(response.data.predictions);
				} else {
					setOptions([]);
				}
			}, 250),
		[],
	);

	React.useEffect(() => {
		fetchPlaceOptions(inputValue);
	}, [inputValue]);

	const handleChange = (event: any, newValue: PlaceType | null) => {
		onChange(newValue);
	};

	return (
		<Autocomplete<PlaceType>
			value={value}
			onChange={handleChange}
			options={options}
			fullWidth
			filterOptions={(o) => o}
			loading={loading}
			isOptionEqualToValue={(option) => option.place_id === value?.place_id}
			onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
			filterSelectedOptions
			getOptionLabel={(option: PlaceType) => option.description}
			renderInput={(params) => (
				<TextField {...params} required variant="standard" label="Location" />
			)}
			renderOption={(props, option) => (
				<PlaceSelectorOption key={option.place_id} props={props} option={option} />
			)}
		/>
	);
};

export default PlaceSelector;
