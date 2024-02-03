import Panel from 'components/core/Panel/Panel';
import { useDates } from 'context/DateContext';
import * as React from 'react';
import StatusSelector from '../../../SHOWS/StatusSelector/StatusSelector';
import EditField from 'components/core/EditField/EditField';
import PlaceEditField from 'components/core/PlaceEditField/PlaceEditField';
import DangerZone from 'components/core/DangerZone/DangerZone';
import { Box, FormControlLabel, Switch } from '@mui/material';
import ShowDaySwitch from 'components/DATES/ShowDaySwitch/ShowDaySwitch';
import PublishDateSwitch from 'components/DATES/PublishDateSwitch/PublishDateSwitch';
import dayjs from 'dayjs';

const DatePanel = ({}) => {
	const { activeDate, updateTourdate, deleteTourdate, isTourAdmin } = useDates();

	return (
		activeDate && (
			<Panel
				title="Details"
				footer={
					<DangerZone
						onDelete={deleteTourdate}
						deleteBtnText="Delete Tour Date"
						popoverText={`Are you sure you want to delete this date?`}
					></DangerZone>
				}
			>
				<EditField
					canEdit={isTourAdmin}
					label="Title"
					name="title"
					value={activeDate.title}
					onChange={updateTourdate}
					fullWidth
				/>
				<PlaceEditField
					name="place_id"
					label="Location"
					canEdit={isTourAdmin}
					onChange={updateTourdate}
					initialInputValue={`${activeDate?.place?.name}, ${activeDate?.place?.political_address}`}
				/>
				<EditField
					canEdit={isTourAdmin}
					label="General Notes"
					name="notes"
					fullWidth
					value={activeDate.notes}
					onChange={updateTourdate}
					multiline
				/>
				<Box>
					<PublishDateSwitch />
					<ShowDaySwitch />
				</Box>
			</Panel>
		)
	);
};

export default DatePanel;
