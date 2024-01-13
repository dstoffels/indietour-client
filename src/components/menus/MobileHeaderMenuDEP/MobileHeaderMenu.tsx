import { Close, Logout, Menu } from '@mui/icons-material';
import { IconButton, List, ListItem, Stack, SwipeableDrawer, Typography } from '@mui/material';
import LoginForm from 'components/auth/LoginForm/LoginForm';
import LogoutBtn from 'components/auth/LogoutBtn/LogoutBtn';
import BandSelector from 'components/bands/BandSelector/BandSelector';
import { useAuth } from 'context/uthContext';
import { useTheme } from 'context/ThemeContext';
import * as React from 'react';
import { useState, useEffect } from 'react';

export interface MobileHeaderMenuProps {}

const MobileHeaderMenu = ({}: MobileHeaderMenuProps) => {
	const [open, setOpen] = useState(false);
	const { user } = useAuth();
	const { theme, headerHeight } = useTheme();

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const toggleOpen = () => {
		open ? handleClose() : handleOpen();
	};

	return (
		<>
			<IconButton onClick={toggleOpen}>{open ? <Close /> : <Menu />}</IconButton>
			<SwipeableDrawer anchor="top" open={open} onClose={handleClose} onOpen={handleOpen}>
				<List sx={{ paddingTop: `${headerHeight + 5}px` }}>
					{user && (
						<ListItem>
							<BandSelector />
						</ListItem>
					)}
					{!user && (
						<ListItem>
							<LoginForm />
						</ListItem>
					)}
					<LogoutBtn />
				</List>
			</SwipeableDrawer>
		</>
	);
};

export default MobileHeaderMenu;
