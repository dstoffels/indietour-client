import { Place } from 'context/ateContext';
import api from 'utils/api';
import * as React from 'react';
import { useState, useEffect } from 'react';

const useVenues = () => {
	const [venueTypes, setVenueTypes] = useState<VenueType[]>([]);
	const [venues, setVenues] = useState<Venue[]>([]);
	const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

	const createVenue = async (venueData: Venue) => {
		const response = await api.post(`/venues`, venueData);
		setSelectedVenue(response.data);
	};

	const fetchVenues = async (query: VenueParams) => {
		const response = await api.get(`/venues${query.toString()}`);
		setVenues(response.data);
	};

	const updateVenue = async (venueData: Venue) => {
		const response = await api.patch(`/venues${selectedVenue?.id}`, venueData);
		setSelectedVenue(response.data);
	};

	const fetchVenueTypes = async () => {
		const response = await api.get(`/venues/types`);
		setVenueTypes(response.data);
	};

	return {
		venues,
		setVenues,
		selectedVenue,
		setSelectedVenue,
		updateVenue,
		fetchVenues,
		createVenue,
		venueTypes,
		fetchVenueTypes,
	};
};

export default useVenues;

export interface Venue {
	id?: string;
	place_id?: string;
	place?: Place;
	creator?: string;
	capacity?: number;
	type?: VenueType;
	note?: VenueNote;
	public?: boolean;
	contacts?: []; // TODO
	show_count?: number;
	minimum_age?: number;
}

interface VenueNote {
	note?: string;
}

export type VenueType =
	| 'Amphitheater'
	| 'Arena'
	| 'Bar'
	| 'Brewpub'
	| 'Club'
	| 'Coffeehouse'
	| 'Fair'
	| 'Festival'
	| 'House'
	| 'Listening Room'
	| 'Nightclub'
	| 'PAC'
	| 'Stadium'
	| 'Theater'
	| 'Winery'
	| 'Other';

export class VenueParams {
	name?: string;
	location?: string;
	capacity?: string;
	type?: VenueType;

	toString = () => {
		let query = [];

		this.name && query.push(`name=${this.name}`);
		this.location && query.push(`location=${this.location}`);
		this.capacity && query.push(`capacity=${this.capacity}`);
		this.type && query.push(`type=${this.type}`);

		return '?' + query.join('&');
	};

	constructor(name?: string, location?: string, capacity?: string, type?: VenueType) {
		this.name = name;
		this.location = location;
		this.capacity = capacity;
		this.type = type;
	}
}
