import { Box, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { ComponentType, PropsWithChildren, ReactElement } from 'react';

const SelectorItem = ({
	onClick,
	onClose,
	disableBtn,
	onSelect,
	selected,
	children,
}: SelectorItemProps) => {
	const handleClick = () => {
		onClick && onClick();
		onClose && onClose();
		!disableBtn && onSelect && onSelect(children as string);
	};

	return (
		<ListItem disablePadding onClick={handleClick}>
			{disableBtn ? (
				<Box width="100%">{children}</Box>
			) : (
				<ListItemButton selected={selected}>{children}</ListItemButton>
			)}
		</ListItem>
	);
};

export default SelectorItem;

export interface SelectorItemProps extends PropsWithChildren {
	onClick?: () => void;
	onClose?: () => void;
	onSelect?: (value: string) => void;
	disableBtn?: boolean;
	selected?: boolean;
}
