import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useAuth } from 'context/AuthContext';
import { useDates } from 'context/ateContext';
import { useGlobals } from 'context/GlobalContext';
import { useTours } from 'context/TourContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

const DatesDrawerBtn = ({}) => {
	const { user } = useAuth();
	const { dateDrawerOpen, setDateDrawerOpen } = useGlobals();
	const { activeTour } = useTours();

	const handleDrawerOpen = () => {
		setDateDrawerOpen(!dateDrawerOpen);
	};

	return (
		<Button
			color="info"
			disabled={!activeTour}
			onClick={handleDrawerOpen}
			endIcon={dateDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
		>
			Dates
		</Button>
	);
};

export default DatesDrawerBtn;
