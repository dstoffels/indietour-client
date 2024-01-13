import NewTimeslotForm from 'components/DATES/SCHEDULE/NewTimeslotForm/NewTimeslotForm';
import Panel from 'components/core/Panel/Panel';
import { useDates } from 'context/ateContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

export interface SchedulePanelProps {}

const SchedulePanel = ({}: SchedulePanelProps) => {
	const { activeDate } = useDates();

	return (
		activeDate && (
			<Panel title="Schedule">
				<NewTimeslotForm />
			</Panel>
		)
	);
};

export default SchedulePanel;
