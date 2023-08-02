import { Box, Button, Collapse, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import SideStack from '../SideStack/SideStack';
import { Add, Check, Close } from '@mui/icons-material';
import useKeyPress from 'utils/useKeyPress';

interface ButtonFormProps {
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
	onClose?: () => any;
}

const ButtonForm = React.forwardRef(
	(
		{
			title,
			btnText,
			btnIcon,
			btnVariant = 'text',
			btnColor = 'inherit',
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
		};

		const handleClose = () => {
			setShowForm(false);
			onClose && onClose();
		};

		useKeyPress('Escape', handleClose);

		return (
			<Box ref={ref}>
				<Collapse in={!showForm} timeout={timeout}>
					<Button
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
									<>
										<Button variant="contained" color="error" onClick={handleClose}>
											Cancel
										</Button>
										<Button variant="contained" color="info" type="submit" disabled={disabled}>
											{submitBtnTxt}
										</Button>
									</>
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
