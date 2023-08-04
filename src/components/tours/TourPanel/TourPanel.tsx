import { Box, Button, Typography } from '@mui/material';
import EditField from 'components/core/EditField/EditField';
import DangerZone from 'components/core/DangerZone/DangerZone';
import Panel from 'components/core/Panel/Panel';
import { useAuth } from 'context/AuthContext';
import { useDates } from 'context/DateContext';
import { useTours } from 'context/TourContext';
import * as React from 'react';
import { useState, useEffect } from 'react';
import FieldTitle from 'components/core/FieldTitle/FieldTitle';
import CreateTouruserForm from '../CreateTouruserForm/CreateTouruserForm';
import TouruserItem from '../TouruserItem/TouruserItem';

export interface TourPanelProps {}

const TourPanel = ({}: TourPanelProps) => {
	const { activeTour, updateTour, deleteTour, isTourAdmin } = useTours();
	const { activeDate } = useDates();

	const handleArchiveTour = async () => {
		await updateTour({ is_archived: !activeTour?.is_archived });
	};

	const title = `Tour ${activeTour?.is_archived ? ' (Archived)' : ''}`;

	const touruserItems = activeTour?.tourusers?.map((touruser) => (
		<TouruserItem key={touruser.id} touruser={touruser} />
	));

	return (
		!activeDate &&
		activeTour && (
			<Panel
				title={title}
				footer={
					<DangerZone
						onDelete={deleteTour}
						confirmationText={activeTour.name}
						deleteBtnText="Delete Tour"
					>
						<Button fullWidth variant="text" color="warning" onClick={handleArchiveTour}>
							{activeTour.is_archived ? 'Restore Tour' : 'Archive Tour'}
						</Button>
					</DangerZone>
				}
			>
				<EditField
					fullWidth
					value={activeTour?.name}
					onChange={updateTour}
					name="name"
					canEdit={isTourAdmin}
				/>
				<Box>
					<FieldTitle>Users</FieldTitle>
					<CreateTouruserForm />
					{touruserItems}
				</Box>
			</Panel>
		)
	);
};

export default TourPanel;
