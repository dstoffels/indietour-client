import {
	Box,
	Button,
	Collapse,
	IconButton,
	ListSubheader,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import SideStack from '../SideStack/SideStack';
import { Add, Check, Close } from '@mui/icons-material';
import useKeyPress from 'utils/useKeyPress';

export interface ButtonFormProps extends React.PropsWithChildren {
	title?: string;
	btnText: string;
	btnIcon?: React.ReactNode;
	btnVariant?: 'contained' | 'outlined' | 'text';
	btnColor?: 'inherit' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
	onSubmit: (e: React.FormEvent) => Promise<void>;
	children: React.ReactNode;
	info?: string;
	autoclose?: boolean;
	timeout?: number;
	disabled?: boolean;
	spacing?: number;
	submitBtnTxt: string;
	iconBtns?: boolean;
	onOpen?: (open: boolean) => any;
	onClose?: (open: boolean) => any;
	fullWidth?: boolean;
}

const ButtonForm = React.forwardRef(
	(
		{
			title,
			btnText,
			btnIcon = <Add />,
			btnVariant = 'text',
			btnColor = 'primary',
			submitBtnTxt,
			onSubmit,
			children,
			info,
			autoclose = true,
			timeout = 400,
			disabled,
			spacing,
			iconBtns = false,
			onClose,
			onOpen,
			fullWidth,
		}: ButtonFormProps,
		ref,
	) => {
		const [showForm, setShowForm] = useState(false);

		const handleSubmit = async (e: React.FormEvent) => {
			e.preventDefault();
			await onSubmit(e);
			autoclose && setShowForm(false);
		};

		const handleOpen = () => {
			setShowForm(true);
			onOpen && onOpen(true);
		};

		const handleClose = () => {
			setShowForm(false);
			onClose && onClose(false);
		};

		useKeyPress('Escape', handleClose);

		return (
			<Box ref={ref}>
				<Collapse in={!showForm} timeout={timeout}>
					<Button
						fullWidth={fullWidth}
						variant={btnVariant}
						color={btnColor}
						size="large"
						startIcon={btnIcon}
						onClick={handleOpen}
					>
						{btnText}
					</Button>
				</Collapse>
				<Collapse in={showForm} timeout={timeout}>
					<Box component="form" onSubmit={handleSubmit} padding={1}>
						<Stack spacing={1}>
							<Typography color="secondary" variant="h5">
								{title}
							</Typography>
							<Stack spacing={spacing}>{children}</Stack>
							<SideStack justifyContent="end" spacing={1}>
								{info && <Typography variant="caption">{info}</Typography>}
								{iconBtns ? (
									<>
										<Tooltip title="Submit">
											<span>
												<IconButton size="large" color="info" type="submit" disabled={disabled}>
													<Check />
												</IconButton>
											</span>
										</Tooltip>
										<Tooltip title="Cancel">
											<IconButton color="error" onClick={handleClose}>
												<Close />
											</IconButton>
										</Tooltip>
									</>
								) : (
									<SideStack marginTop={2}>
										<Button variant={btnVariant} color="error" onClick={handleClose}>
											Cancel
										</Button>
										<Button variant={btnVariant} color="info" type="submit" disabled={disabled}>
											{submitBtnTxt}
										</Button>
									</SideStack>
								)}
							</SideStack>
						</Stack>
					</Box>
				</Collapse>
			</Box>
		);
	},
);

export default ButtonForm;
