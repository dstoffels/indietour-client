import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { useAuth } from 'context/AuthContext';
import { useDates } from 'context/DateContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

const DatesDrawerBtn = ({}) => {
	const { user } = useAuth();
	const { drawerOpen, setDrawerOpen } = useDates();
	return (
		<Button
			onClick={() => setDrawerOpen(!drawerOpen)}
			startIcon={drawerOpen ? <ChevronLeft /> : <ChevronRight />}
		>
			Dates
		</Button>
	);
};

export default DatesDrawerBtn;
