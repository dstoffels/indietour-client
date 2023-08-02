import { Autocomplete, TextField, debounce } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import api from 'utils/api';
import PlaceSelectorOption, { PlaceType } from './PlaceSelectorOption';

interface PlaceSelectorProps {
	value: PlaceType | null;
	onChange: (place: PlaceType | null) => void;
	label?: string;
	initialInputValue?: string;
	required?: boolean;
}

const PlaceSelector = ({
	value,
	onChange,
	label = 'Location',
	initialInputValue = '',
	required,
}: PlaceSelectorProps) => {
	const [inputValue, setInputValue] = useState<string>(initialInputValue);
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

	useEffect(() => {
		initialInputValue && setInputValue(initialInputValue);
	}, [initialInputValue]);

	useEffect(() => {
		fetchPlaceOptions(inputValue);
	}, [inputValue]);

	// WATCH ME FOR UNEXPECTED BEHAVIOR
	useEffect(() => {
		// !value && setInputValue('');
	}, [value]);

	const handleChange = (event: any, newValue: PlaceType | null) => {
		onChange(newValue);
	};

	return (
		<Autocomplete<PlaceType>
			// @ts-expect-error
			freeSolo
			value={value}
			onChange={handleChange}
			options={options}
			fullWidth
			filterOptions={(o) => o}
			isOptionEqualToValue={(option) => option.place_id === value?.place_id}
			inputValue={inputValue}
			onInputChange={(e, newInputValue) => setInputValue(newInputValue)}
			filterSelectedOptions
			getOptionLabel={(option: PlaceType) => option.description}
			renderInput={(params) => (
				<TextField {...params} required={required} variant="standard" label={label} />
			)}
			renderOption={(props, option) => (
				<PlaceSelectorOption key={option.place_id} props={props} option={option} />
			)}
		/>
	);
};

export default PlaceSelector;
