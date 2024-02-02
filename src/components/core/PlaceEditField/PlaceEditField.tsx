import * as React from 'react';
import { useState, useEffect } from 'react';
import EditField, { EditFieldProps } from '../EditField/EditField';
import PlaceSelector from '../PlaceSelector/PlaceSelector';
import { PlaceMin } from '../PlaceSelector/PlaceSelectorOption';

interface ExtendedProps {
	initialInputValue: string;
}

export type PlaceEditFieldProps = EditFieldProps & ExtendedProps;

const PlaceEditField = (props: PlaceEditFieldProps) => {
	const { onChange, name, initialInputValue, ...otherProps } = props;

	const [place, setPlace] = useState<PlaceMin | null>(null);

	const handleChange = (place: PlaceMin | null) => {
		setPlace(place);
	};

	useEffect(() => {
		place && onChange({ [name]: place?.place_id });
	}, [place]);

	return (
		<EditField {...props} value={initialInputValue || ''}>
			<PlaceSelector
				value={place}
				onChange={handleChange}
				initialInputValue={initialInputValue || ''}
			/>
		</EditField>
	);
};

export default PlaceEditField;
