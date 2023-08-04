import { SwipeableDrawer } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import DrawerContent from './DrawerContents';
import { useDates } from 'context/DateContext';
import { NewDateFormProps } from '../NewDateForm/NewDateForm';
import { useGlobals } from 'context/GlobalContext';

const MobileDrawer = (props: NewDateFormProps) => {
	const [initialized, setInitialized] = useState(false);
	const { activeDate } = useDates();
	const { dateDrawerOpen, setDateDrawerOpen } = useGlobals();

	const handleOpen = () => {
		!dateDrawerOpen && setDateDrawerOpen(true);
	};

	const handleClose = () => {
		dateDrawerOpen && setDateDrawerOpen(false);
	};

	useEffect(() => {
		!initialized && setInitialized(true);
		activeDate ? handleClose() : handleOpen();
	}, [activeDate]);

	return (
		<SwipeableDrawer
			swipeAreaWidth={50}
			anchor="left"
			open={initialized && dateDrawerOpen}
			onOpen={handleOpen}
			onClose={handleClose}
			disableSwipeToOpen={false}
		>
			<DrawerContent {...props} />
		</SwipeableDrawer>
	);
};

export default MobileDrawer;
