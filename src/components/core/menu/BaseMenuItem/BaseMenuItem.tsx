import {
	ListItem,
	ListItemButton,
	ListItemButtonProps,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';

interface BaseMenuItemProps extends ListItemButtonProps {
	onClose?: () => void;
	icon: React.ReactNode;
	text: string;
}

const BaseMenuItem = ({ onClick, onClose, icon, text, children }: BaseMenuItemProps) => {
	const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
		onClick && onClick(event);
		onClose && onClose();
	};

	const content = (
		<>
			{icon && <ListItemIcon>{icon}</ListItemIcon>}
			{text ? <ListItemText>{text}</ListItemText> : children}
		</>
	);

	return (
		<ListItem disablePadding>
			{onClick ? <ListItemButton onClick={handleClick}>{content}</ListItemButton> : content}
		</ListItem>
	);
};

export default BaseMenuItem;
