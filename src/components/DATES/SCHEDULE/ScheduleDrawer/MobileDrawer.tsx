import { SwipeableDrawer } from '@mui/material';
import { useGlobals } from 'context/GlobalContext';
import { PropsWithChildren } from 'react';
import DrawerContents from './DrawerContents';

const MobileDrawer = () => {
	const { scheduleDrawerOpen, toggleScheduleDrawer } = useGlobals();

	return (
		<SwipeableDrawer
			swipeAreaWidth={30}
			anchor="right"
			open={scheduleDrawerOpen}
			onOpen={toggleScheduleDrawer}
			onClose={toggleScheduleDrawer}
			disableSwipeToOpen={false}
		>
			<DrawerContents />
		</SwipeableDrawer>
	);
};

export default MobileDrawer;
