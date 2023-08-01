import { Button } from '@mui/material';
import EditField from 'components/core/EditField/EditField';
import DangerZonePanel from 'components/core/Panel/DangerZonePanel';
import Panel from 'components/core/Panel/Panel';
import { useAuth } from 'context/authContext';
import { useDates } from 'context/dateContext';
import { useTours } from 'context/tourContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

export interface TourPanelProps {}

const TourPanel = ({}: TourPanelProps) => {
	const { activeTour, updateTour, isTourAdmin } = useTours();
	const { activeDate } = useDates();

	const handleArchiveTour = async () => {
		await updateTour({ is_archived: !activeTour?.is_archived });
	};

	return (
		!activeDate &&
		activeTour && (
			<Panel title="Tour">
				<EditField
					value={activeTour?.name}
					onChange={updateTour}
					name="name"
					canEdit={isTourAdmin}
				/>
				<DangerZonePanel confirmationText={activeTour.name} fullwidth deleteBtnText="Delete Tour">
					<Button variant="contained" color="warning" onClick={handleArchiveTour}>
						{activeTour.is_archived ? 'Restore Tour' : 'Archive Tour'}
					</Button>
				</DangerZonePanel>
			</Panel>
		)
	);
};

export default TourPanel;
