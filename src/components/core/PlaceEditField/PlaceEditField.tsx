import * as React from 'react';
import { useState, useEffect } from 'react';
import EditField, { EditFieldProps } from '../EditField/EditField';
import PlaceSelector from '../PlaceSelector/PlaceSelector';
import { PlaceType } from '../PlaceSelector/PlaceSelectorOption';

interface ExtendedProps {
	initialInputValue: string;
}

export type PlaceEditFieldProps = EditFieldProps & ExtendedProps;

const PlaceEditField = (props: PlaceEditFieldProps) => {
	const { onChange, name, initialInputValue, ...otherProps } = props;
	console.log(name);

	const [place, setPlace] = useState<PlaceType | null>(null);

	const handleChange = (place: PlaceType | null) => {
		setPlace(place);
	};

	useEffect(() => {
		console.log(place?.place_id);
		place && onChange({ [name]: place?.place_id });
	}, [place]);

	return (
		<EditField {...props} value={initialInputValue}>
			<PlaceSelector value={place} onChange={handleChange} initialInputValue={initialInputValue} />
		</EditField>
	);
};

export default PlaceEditField;
