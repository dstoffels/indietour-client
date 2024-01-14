import { Drawer } from '@mui/material';
import { useGlobals } from 'context/GlobalContext';
import { useTheme } from 'context/ThemeContext';
import NewTimeslotForm from '../NewTimeslotForm/NewTimeslotForm';
import { PropsWithChildren } from 'react';
import DrawerContents from './DrawerContents';

const drawerWidth = 350;

const PersistentDrawer = () => {
	const { theme } = useTheme();
	const { scheduleDrawerOpen, toggleScheduleDrawer } = useGlobals();

	return (
		<Drawer
			sx={{
				zIndex: theme.zIndex.drawer - 1,
				maxWidth: drawerWidth,
				[`& .MuiDrawer-paper`]: { maxWidth: drawerWidth, boxSizing: 'border-box' },
			}}
			anchor="right"
			open={scheduleDrawerOpen}
			onClose={toggleScheduleDrawer}
			hideBackdrop
			variant="persistent"
		>
			<DrawerContents />
		</Drawer>
	);
};

export default PersistentDrawer;
