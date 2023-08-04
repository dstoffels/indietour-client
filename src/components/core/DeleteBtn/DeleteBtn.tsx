import { DeleteForever } from '@mui/icons-material';
import {
	Box,
	Button,
	ButtonProps,
	IconButton,
	Popover,
	Stack,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import SideStack from '../SideStack/SideStack';

export interface DeleteBtnProps extends React.PropsWithChildren {
	variant?: ButtonProps['variant'] | 'icon';
	onDelete: () => any;
	popoverText?: string;
	/**
	 * Define text the user must input to confirm deletion. If undefined, only a confirm delete button will be displayed.
	 */
	confirmationText?: string;
	tooltip?: string;
	size?: 'large' | 'medium' | 'small';
}

const DeleteBtn = ({
	variant = 'contained',
	onDelete,
	popoverText,
	confirmationText,
	children,
	tooltip,
	size,
}: DeleteBtnProps) => {
	const [confirmation, setConfirmation] = useState<string>('');
	const confirmed = confirmation === confirmationText;
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setConfirmation('');
	};

	const handleDelete = () => {
		onDelete && onDelete();
		handleClose();
	};

	const handleConfirmation = (event: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmation(event.target.value);
	};

	return (
		<Tooltip title={tooltip}>
			<>
				{variant === 'icon' ? (
					<IconButton size={size} onClick={handleOpen} color="error">
						{children || <DeleteForever />}
					</IconButton>
				) : (
					<Button size={size} variant={variant} onClick={handleOpen} color="error" fullWidth>
						{children}
					</Button>
				)}
				<Popover
					open={open}
					anchorEl={anchorEl}
					anchorOrigin={{ horizontal: 'center', vertical: 'center' }}
					transformOrigin={{ horizontal: 'center', vertical: 'center' }}
				>
					<Stack padding={2} spacing={2}>
						{popoverText && (
							<Typography variant="overline" textAlign="center">
								{popoverText}
							</Typography>
						)}
						{confirmationText && (
							<>
								<Typography>
									Please type{' '}
									<Typography component="span" color="primary">
										{confirmationText}
									</Typography>{' '}
									to confirm
								</Typography>
								<TextField variant="standard" value={confirmation} onChange={handleConfirmation} />
							</>
						)}
						<SideStack justifyContent="center">
							<Button
								disabled={confirmationText ? !confirmed : false}
								color="error"
								onClick={handleDelete}
							>
								DELETE
							</Button>
							<Button color="warning" onClick={handleClose}>
								CANCEL
							</Button>
						</SideStack>
					</Stack>
				</Popover>
			</>
		</Tooltip>
	);
};

export default DeleteBtn;
