import { GoogleMap, Marker, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import MapIcon from './MapIcon';
import { Place } from '../types';

export type MapProps = {
	place: Place;
	options?: google.maps.MapOptions;
};

const Map = ({ place, options }: MapProps) => {
	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
	});

	const center = place.geometry.location;

	return (
		isLoaded && (
			<GoogleMap
				mapContainerStyle={{ height: '30vh', minWidth: 300, maxWidth: '100%' }}
				center={center}
				zoom={10}
				options={options}
			>
				<OverlayView position={center} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
					<MapIcon label={place.name} />
				</OverlayView>
			</GoogleMap>
		)
	);
};

export default Map;
