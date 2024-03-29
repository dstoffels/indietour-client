import { ListItem, ListItemText, Switch } from '@mui/material';
import { useAuth } from 'context/AuthContext';
import { useBands } from 'context/BandContext';
import { useTours } from 'context/TourContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

const ArchivedToursSwitch = ({}) => {
	const { user, updateUser } = useAuth();
	const { fetchBands } = useBands();

	const toggleArchivedTours = async () => {
		updateUser({ show_archived_tours: !user?.show_archived_tours });
	};

	useEffect(() => {
		fetchBands();
	}, [user?.show_archived_tours]);

	return (
		<ListItem>
			<ListItemText>Archived Tours</ListItemText>
			<Switch onChange={toggleArchivedTours} checked={user?.show_archived_tours} />
		</ListItem>
	);
};

export default ArchivedToursSwitch;
