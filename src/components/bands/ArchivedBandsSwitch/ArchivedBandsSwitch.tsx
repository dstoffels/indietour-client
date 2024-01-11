import { ListItem, ListItemText, Switch } from '@mui/material';
import { useAuth } from 'context/AuthContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

const ArchivedBandsSwitch = ({}) => {
	const { user, updateUser } = useAuth();

	const toggleShowArchivedBands = async () => {
		updateUser({ show_archived_bands: !user?.show_archived_bands });
	};

	return (
		<ListItem>
			<ListItemText>Archived Bands</ListItemText>
			<Switch onChange={toggleShowArchivedBands} checked={user?.show_archived_bands} />
		</ListItem>
	);
};

export default ArchivedBandsSwitch;
