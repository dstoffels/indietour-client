import Panel from 'components/core/Panel/Panel';
import { useDates } from 'context/dateContext';
import * as React from 'react';
import { useState, useEffect } from 'react';
import StatusSelector from '../../StatusSelector/StatusSelector';
import EditField from 'components/core/EditField/EditField';
import PlaceSelector from 'components/core/PlaceSelector/PlaceSelector';
import PlaceEditField from 'components/core/PlaceEditField/PlaceEditField';

const DatePanel = ({}) => {
	const { activeDate, updateTourdate } = useDates();

	return (
		activeDate && (
			<Panel title="Details">
				<StatusSelector />
				<PlaceEditField />
				<EditField
					label="Title"
					name="title"
					value={activeDate.title}
					onChange={updateTourdate}
					fullWidth
				/>
				<EditField
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
