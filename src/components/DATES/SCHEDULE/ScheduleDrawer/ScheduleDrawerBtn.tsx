import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useDates } from 'context/DateContext';
import { useGlobals } from 'context/GlobalContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

const ScheduleDrawerBtn = () => {
	const { activeDate } = useDates();
	const { scheduleDrawerOpen, setScheduleDrawerOpen } = useGlobals();

	const handleDrawerOpen = () => {
		setScheduleDrawerOpen(!scheduleDrawerOpen);
	};

	return (
		<Button
			disabled={!activeDate}
			onClick={handleDrawerOpen}
			startIcon={scheduleDrawerOpen ? <ChevronRight /> : <ChevronLeft />}
		>
			Schedule
		</Button>
	);
};

export default ScheduleDrawerBtn;
