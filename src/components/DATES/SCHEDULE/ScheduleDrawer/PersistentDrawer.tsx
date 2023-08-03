import { Drawer } from '@mui/material';
import { useGlobals } from 'context/GlobalContext';
import { useTheme } from 'context/ThemeContext';
import NewTimeslotForm from '../NewTimeslotForm/NewTimeslotForm';
import { PropsWithChildren } from 'react';

const PersistentDrawer = ({ children }: PropsWithChildren) => {
	const { theme } = useTheme();
	const { scheduleDrawerOpen, setScheduleDrawerOpen } = useGlobals();

	const toggleDrawer = () => {
		setScheduleDrawerOpen(!scheduleDrawerOpen);
	};

	return (
		<Drawer
			sx={{ zIndex: theme.zIndex.drawer - 1 }}
			anchor="right"
			open={scheduleDrawerOpen}
			onClose={toggleDrawer}
			hideBackdrop
			variant="persistent"
		>
			{children}
		</Drawer>
	);
};

export default PersistentDrawer;
