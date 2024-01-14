import { Autocomplete, TextField } from '@mui/material';
import VenueAutocomplete from 'components/VENUES/VenueAutocomplete/VenueAutocomplete';
import Panel from 'components/core/Panel/Panel';
import { useDates } from 'context/DateContext';
import { VenueParams } from 'hooks/useVenues';
import * as React from 'react';
import { useState, useEffect } from 'react';

const ShowPanel = () => {
	const { activeDate } = useDates();

	const q = new VenueParams();
	q.name = 'abc';
	q.capacity = 'x';

	return (
		activeDate &&
		activeDate.is_show_day && (
			<Panel title="Shows">
				<VenueAutocomplete />
			</Panel>
		)
	);
};

export default ShowPanel;
