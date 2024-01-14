import Panel from 'components/core/Panel/Panel';
import { useDates } from 'context/DateContext';
import * as React from 'react';
import StatusSelector from '../../StatusSelector/StatusSelector';
import EditField from 'components/core/EditField/EditField';
import PlaceEditField from 'components/core/PlaceEditField/PlaceEditField';
import DangerZone from 'components/core/DangerZone/DangerZone';
import { FormControlLabel, Switch } from '@mui/material';
import ShowDaySwitch from 'components/DATES/ShowDaySwitch/ShowDaySwitch';

const DatePanel = ({}) => {
	const { activeDate, updateTourdate, deleteTourdate, isTourAdmin } = useDates();

	return (
		activeDate && (
			<Panel
				title="Tour Date"
				footer={
					<DangerZone
						onDelete={deleteTourdate}
						deleteBtnText="Delete Tour Date"
						popoverText={`Are you sure you want to delete this date?`}
					></DangerZone>
				}
			>
				<StatusSelector />
				<ShowDaySwitch />
				<PlaceEditField
					name="place_id"
					label="Location"
					canEdit={isTourAdmin}
					onChange={updateTourdate}
					initialInputValue={`${activeDate?.place?.name}, ${activeDate?.place?.political_address}`}
				/>
				<EditField
					canEdit={isTourAdmin}
					label="Title"
					name="title"
					value={activeDate.title}
					onChange={updateTourdate}
					fullWidth
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
			</Panel>
		)
	);
};

export default DatePanel;
