import { SwipeableDrawer } from '@mui/material';
import { useGlobals } from 'context/GlobalContext';
import { PropsWithChildren } from 'react';
import DrawerContents from './DrawerContents';

const MobileDrawer = () => {
	const { scheduleDrawerOpen, setScheduleDrawerOpen } = useGlobals();

	const handleOpen = () => {
		setScheduleDrawerOpen(true);
	};
	const handleClose = () => {
		setScheduleDrawerOpen(false);
	};

	return (
		<SwipeableDrawer
			swipeAreaWidth={50}
			anchor="right"
			open={scheduleDrawerOpen}
			onOpen={handleOpen}
			onClose={handleClose}
			disableSwipeToOpen={false}
		>
			<DrawerContents />
		</SwipeableDrawer>
	);
};

export default MobileDrawer;
