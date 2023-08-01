import { Close, Menu } from '@mui/icons-material';
import { Hidden, IconButton, List, Paper, Popover, SwipeableDrawer } from '@mui/material';
import { useTheme } from 'context/ThemeContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

interface BaseMenuProps extends React.PropsWithChildren {
	icon?: React.ReactNode;
	drawerAnchor?: 'top' | 'right' | 'bottom' | 'left';
}

const BaseMenu = ({ children, icon = <Menu />, drawerAnchor = 'top' }: BaseMenuProps) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchorEl);

	const { headerHeight } = useTheme();

	const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const toggleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		open ? handleClose() : handleOpen(event);
	};

	return (
		<>
			<IconButton onClick={toggleOpen}>{open ? <Close /> : icon}</IconButton>
			<Hidden mdDown>
				<Popover
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				>
					<List>{children}</List>
				</Popover>
			</Hidden>
			<Hidden mdUp>
				<SwipeableDrawer
					anchor={drawerAnchor}
					open={open}
					onClose={handleClose}
					onOpen={handleOpen}
				>
					<List sx={{ paddingTop: `${headerHeight + 5}px` }}>{children}</List>
				</SwipeableDrawer>
			</Hidden>
		</>
	);
};

export default BaseMenu;
