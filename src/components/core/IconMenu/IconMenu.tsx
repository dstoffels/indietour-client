import { Box, IconButton, Menu } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

interface IconMenuProps {
	icon: React.ReactNode;
	children: React.ReactNode;
}

const IconMenu = ({ icon, children }: IconMenuProps) => {
	const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
	const open = Boolean(anchor);

	const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchor(e.currentTarget);

	const handleClose = () => setAnchor(null);

	return (
		<Box>
			<IconButton onClick={handleOpen}>{icon}</IconButton>
			<Menu open={open} anchorEl={anchor} onClose={handleClose}>
				{children}
			</Menu>
		</Box>
	);
};

export default IconMenu;
