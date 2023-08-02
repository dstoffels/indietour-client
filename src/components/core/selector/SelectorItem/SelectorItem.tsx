import { Box, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { ComponentType, PropsWithChildren, ReactElement } from 'react';

export interface SelectorItemProps extends PropsWithChildren {
	onClick?: () => void;
	onClose?: () => void;
	disableBtn?: boolean;
	selected?: boolean;
}

const SelectorItem = ({ onClick, onClose, selected, children }: SelectorItemProps) => {
	const handleClick = () => {
		onClick && onClick();
		onClose && onClose();
	};

	return (
		<ListItem disablePadding onClick={handleClick}>
			{onClick ? (
				<ListItemButton selected={selected}>{children}</ListItemButton>
			) : (
				<Box width="100%">{children}</Box>
			)}
		</ListItem>
	);
};

export default SelectorItem;
