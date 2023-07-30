import Panel from 'components/core/Panel/Panel';
import { useDates } from 'context/dateContext';
import * as React from 'react';
import { useState, useEffect } from 'react';
import StatusSelector from '../StatusSelector/StatusSelector';

const DatePanel = ({}) => {
	const { activeDate } = useDates();
	return (
		activeDate && (
			<Panel title="Details">
				<StatusSelector />
			</Panel>
		)
	);
};

export default DatePanel;
