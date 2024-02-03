import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Stack,
	Typography,
} from '@mui/material';
import Map from 'components/core/Map/Map';
import { Place } from 'components/core/types';
import useVenues, { Venue } from 'hooks/useVenues';
import * as React from 'react';
import { useState, useEffect } from 'react';
import api from 'utils/api';

export type VenueFormProps = {
	place_id: string;
	onClose: (venue: Venue | null) => void;
};

const VenueForm = ({ place_id, onClose }: VenueFormProps) => {
	const { createVenue } = useVenues();

	const handleSubmit = async () => {
		const newVenue = (await createVenue({ place_id })) as Venue;
		onClose(newVenue);
	};

	const [place, setPlace] = useState<Place | null>(null);

	const fetchPlace = async () => {
		const response = await api.get(`/places/${place_id}`);
		setPlace(response.data.result);
	};

	useEffect(() => {
		place_id && fetchPlace();
	}, [place_id]);

	return (
		// @ts-ignore
		<Dialog open={Boolean(place_id)}>
			<DialogContent>
				<Stack spacing={2} marginBottom={3}>
					<Stack>
						<Typography fontWeight="500">{place?.name}</Typography>
						<Typography variant="caption">{place?.formatted_address}</Typography>
					</Stack>
				</Stack>
				{place && <Map place={place} options={{ mapTypeControl: false }} />}
				<DialogContentText>
					This place is not in our venue database. Click Add Venue to add it and assign it to your
					show!
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => onClose(null)} color="error">
					Cancel
				</Button>
				<Button color="info" onClick={handleSubmit}>
					Add Venue
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default VenueForm;
