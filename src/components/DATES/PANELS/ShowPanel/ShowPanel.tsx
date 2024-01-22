import { Autocomplete, Box, TextField } from '@mui/material';
import ShowItem from 'components/SHOWS/ShowItem/ShowItem';
import StatusSelector, { getStatusColor } from 'components/SHOWS/StatusSelector/StatusSelector';
import { Show } from 'components/SHOWS/types';
import VenueAutocomplete from 'components/VENUES/VenueAutocomplete/VenueAutocomplete';
import EditField from 'components/core/EditField/EditField';
import Panel from 'components/core/Panel/Panel';
import { useDates } from 'context/DateContext';
import { useTours } from 'context/TourContext';
import useShows from 'hooks/useShows';
import { VenueParams } from 'hooks/useVenues';
import * as React from 'react';
import { useState, useEffect } from 'react';

const ShowPanel = ({ confirmedOnly = false }: ShowPanelProps) => {
	const { activeDate } = useDates();
	const [activeIndex, setActiveIndex] = useState(-1);

	const q = new VenueParams();
	q.name = 'abc';
	q.capacity = 'x';

	const shows = confirmedOnly
		? activeDate?.shows?.filter((show) => show.status === 'CONFIRMED')
		: activeDate?.shows;

	const showItems = shows?.map((show, i) => (
		<ShowItem
			show={show}
			index={i}
			activeIndex={activeIndex}
			key={show.date_id}
			onClick={setActiveIndex}
		/>
	));

	return (
		activeDate?.is_show_day && (
			<Panel title="Shows">
				<Box>{showItems}</Box>
			</Panel>
		)
	);
};

export default ShowPanel;

export type ShowPanelProps = {
	confirmedOnly?: boolean;
};
