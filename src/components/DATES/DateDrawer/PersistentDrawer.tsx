import { Drawer } from '@mui/material';
import { useTheme } from 'context/ThemeContext';
import DrawerContent from './DrawerContents';
import { NewDateFormProps } from '../NewDateForm/NewDateForm';
import { useGlobals } from 'context/GlobalContext';

const drawerWidth = 350;

const PersistentDrawer = (props: NewDateFormProps) => {
	const { theme } = useTheme();
	const { dateDrawerOpen, toggleDateDrawer } = useGlobals();

	return (
		<Drawer
			sx={{
				zIndex: theme.zIndex.drawer - 1,
				maxWidth: drawerWidth,
				[`& .MuiDrawer-paper`]: { maxWidth: drawerWidth, boxSizing: 'border-box' },
			}}
			anchor="left"
			open={dateDrawerOpen}
			onClose={toggleDateDrawer}
			hideBackdrop
			variant="persistent"
		>
			<DrawerContent {...props} />
		</Drawer>
	);
};

export default PersistentDrawer;
