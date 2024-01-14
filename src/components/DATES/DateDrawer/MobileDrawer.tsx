import { SwipeableDrawer } from '@mui/material';
import * as React from 'react';
import DrawerContent from './DrawerContents';
import { NewDateFormProps } from '../NewDateForm/NewDateForm';
import { useGlobals } from 'context/GlobalContext';

const MobileDrawer = (props: NewDateFormProps) => {
	const { dateDrawerOpen, toggleDateDrawer: setDateDrawerOpen } = useGlobals();

	const handleOpen = () => {
		!dateDrawerOpen && setDateDrawerOpen(true);
	};

	const handleClose = () => {
		dateDrawerOpen && setDateDrawerOpen(false);
	};

	return (
		<SwipeableDrawer
			swipeAreaWidth={30}
			anchor="left"
			open={dateDrawerOpen}
			onOpen={handleOpen}
			onClose={handleClose}
			disableSwipeToOpen={false}
		>
			<DrawerContent {...props} />
		</SwipeableDrawer>
	);
};

export default MobileDrawer;
