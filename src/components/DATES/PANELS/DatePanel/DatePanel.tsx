import Panel from 'components/core/Panel/Panel';
import { useDates } from 'context/dateContext';
import * as React from 'react';
import { useState, useEffect } from 'react';
import StatusSelector from '../../StatusSelector/StatusSelector';
import EditField from 'components/core/EditField/EditField';
import PlaceSelector from 'components/core/PlaceSelector/PlaceSelector';
import PlaceEditField from 'components/core/PlaceEditField/PlaceEditField';

const DatePanel = ({}) => {
	const { activeDate, updateTourdate, isTourAdmin } = useDates();

	return (
		activeDate && (
			<Panel title="Details">
				<StatusSelector />
				<PlaceEditField
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
