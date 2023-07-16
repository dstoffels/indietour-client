import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, Button, List, Menu, MenuItem, Paper, Popover } from '@mui/material';
import {
	Children,
	MouseEvent,
	PropsWithChildren,
	ReactElement,
	cloneElement,
	isValidElement,
	useState,
} from 'react';
import { SelectorItemProps } from '../SelectorItem/SelectorItem';
import SideStack from 'components/core/SideStack/SideStack';

interface iSelectorItem extends ReactElement<SelectorItemProps> {}

const Selector = ({ selected, children }: SelectorProps) => {
	const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchor(event.currentTarget);
	};

	const handleClose = () => {
		setAnchor(null);
	};

	const open = Boolean(anchor);

	// inject props in to child SelectorItems
	children = Children.map(children as iSelectorItem[], (child: iSelectorItem) =>
		isValidElement<SelectorItemProps>(child)
			? cloneElement(child, {
					onClose: handleClose,
					selected: selected === child.props.children,
			  })
			: child,
	);

	return (
		<SideStack>
			<Button onClick={handleClick} endIcon={<KeyboardArrowDown />}>
				{selected}
			</Button>
			<Popover
				open={open}
				anchorEl={anchor}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
			>
				<Paper>
					<List>{children}</List>
				</Paper>
			</Popover>
		</SideStack>
	);
};

export default Selector;

interface SelectorProps extends PropsWithChildren {
	selected: string;
}
