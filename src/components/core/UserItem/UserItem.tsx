import { Close } from '@mui/icons-material';
import {
	Collapse,
	FormControlLabel,
	IconButton,
	ListItem,
	ListItemButton,
	Stack,
	Switch,
	Tooltip,
	Typography,
} from '@mui/material';
import DeleteBtn from 'components/core/DeleteBtn/DeleteBtn';
import SideStack from 'components/core/SideStack/SideStack';
import { Banduser } from 'context/andContext';
import { Touruser } from 'context/TourContext';
import * as React from 'react';
import { useState } from 'react';
import useKeyPress from 'utils/useKeyPress';

export interface BandUserItemProps {
	user: Banduser | Touruser;
	canEdit: boolean;
	onDelete: (id: string | undefined) => any;
	onAdminChange: (userData: Banduser | Touruser) => any;
}

const UserItem = ({ user, canEdit, onAdminChange, onDelete }: BandUserItemProps) => {
	const [open, setOpen] = useState(false);

	const handleAdmin = async () => {
		await onAdminChange({ id: user.id, is_admin: !user.is_admin });
	};

	const toggleOpen = () => {
		canEdit && setOpen(!open);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useKeyPress('Escape', handleClose);

	const sx = canEdit ? {} : { pointerEvents: 'none' };

	const selected = open ? { backgroundColor: 'rgba(255,255,255,0.06)' } : {};

	return (
		<ListItem disablePadding sx={selected}>
			<Stack width="100%">
				<ListItemButton onClick={toggleOpen} sx={sx}>
					<Stack width="100%">
						<SideStack spacing={0} width="100%">
							<Typography>{user.username || 'No username'}</Typography>
							<Typography variant="caption">{user.is_admin ? 'Admin' : 'User'}</Typography>
						</SideStack>
						<Typography variant="caption">{user.email}</Typography>
					</Stack>
				</ListItemButton>

				<Collapse in={open}>
					<SideStack justifyContent="end" alignItems="center" spacing={2}>
						<FormControlLabel
							checked={user.is_admin}
							onChange={handleAdmin}
							label={<Typography variant="caption">Admin</Typography>}
							labelPlacement="start"
							control={<Switch />}
						/>
						<SideStack justifyContent="end" spacing={1}>
							<DeleteBtn
								size="large"
								tooltip="Remove User"
								popoverText={`Are you sure you want to remove ${user.email}?`}
								onDelete={() => onDelete(user.id)}
								variant="icon"
							/>
							<Tooltip title="Close">
								<IconButton size="large" onClick={toggleOpen}>
									<Close color="info" />
								</IconButton>
							</Tooltip>
						</SideStack>
					</SideStack>
				</Collapse>
			</Stack>
		</ListItem>
	);
};

export default UserItem;
