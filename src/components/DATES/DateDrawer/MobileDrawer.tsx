import { SwipeableDrawer } from '@mui/material';
import * as React from 'react';
import DrawerContent from './DrawerContents';
import { NewDateFormProps } from '../NewDateForm/NewDateForm';
import { useGlobals } from 'context/GlobalContext';

const MobileDrawer = (props: NewDateFormProps) => {
	const { dateDrawerOpen, toggleDateDrawer } = useGlobals();

	return (
		<SwipeableDrawer
			swipeAreaWidth={30}
			anchor="left"
			open={dateDrawerOpen}
			onOpen={toggleDateDrawer}
			onClose={toggleDateDrawer}
			disableSwipeToOpen={false}
		>
			<DrawerContent {...props} />
		</SwipeableDrawer>
	);
};

export default MobileDrawer;
