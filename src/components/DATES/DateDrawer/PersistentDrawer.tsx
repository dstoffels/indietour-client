import { Drawer } from '@mui/material';
import { useTheme } from 'context/ThemeContext';
import DrawerContent from './DrawerContents';
import { NewDateFormProps } from '../NewDateForm/NewDateForm';
import { useGlobals } from 'context/GlobalContext';

const PersistentDrawer = (props: NewDateFormProps) => {
	const { theme } = useTheme();
	const { dateDrawerOpen, toggleDateDrawer: setDateDrawerOpen } = useGlobals();

	const toggleDrawer = () => {
		setDateDrawerOpen(!dateDrawerOpen);
	};

	return (
		<Drawer
			sx={{ zIndex: theme.zIndex.drawer - 1 }}
			anchor="left"
			open={dateDrawerOpen}
			onClose={toggleDrawer}
			hideBackdrop
			variant="persistent"
		>
			<DrawerContent {...props} />
		</Drawer>
	);
};

export default PersistentDrawer;
