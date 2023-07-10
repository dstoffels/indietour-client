import { Box, Button, Collapse, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import SideStack from '../SideStack/SideStack';
import { Add, Check, Close } from '@mui/icons-material';
import { useTheme } from 'context/globalContext';

const ButtonForm = ({
	title,
	btnText,
	btnIcon,
	btnVariant = 'text',
	btnColor = 'inherit',
	onSubmit,
	children,
	info,
	autoclose = true,
	timeout = 200,
	disabled,
	spacing,
}: ButtonFormProps) => {
	const [showForm, setShowForm] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(e);
		autoclose && setShowForm(false);
	};

	const handleShowForm = () => {
		setShowForm(!showForm);
	};

	return (
		<Box my={2}>
			<Collapse in={showForm} timeout={timeout}>
				<Box component="form" onSubmit={handleSubmit} padding={1}>
					<Stack spacing={1}>
						<Typography color="secondary" variant="h5">
							{title}
						</Typography>
						<Stack spacing={spacing}>{children}</Stack>
						<SideStack justifyContent="end" spacing={1}>
							{info && <Typography variant="caption">{info}</Typography>}
							<Tooltip title="Submit">
								<span>
									<IconButton size="large" color="info" type="submit" disabled={disabled}>
										<Check />
									</IconButton>
								</span>
							</Tooltip>
							<Tooltip title="Cancel">
								<IconButton color="error" onClick={handleShowForm}>
									<Close />
								</IconButton>
							</Tooltip>
						</SideStack>
					</Stack>
				</Box>
			</Collapse>
			<Collapse in={!showForm} timeout={timeout}>
				<Button
					variant={btnVariant}
					color={btnColor}
					size="large"
					startIcon={btnIcon}
					onClick={handleShowForm}
				>
					{btnText}
				</Button>
			</Collapse>
		</Box>
	);
};

export default ButtonForm;

interface ButtonFormProps {
	title?: string;
	btnText: string;
	btnIcon?: React.ReactNode;
	btnVariant?: 'contained' | 'outlined' | 'text';
	btnColor?: 'inherit' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
	onSubmit: (e: React.FormEvent) => void;
	children: React.ReactNode;
	info?: string;
	autoclose?: boolean;
	timeout?: number;
	disabled?: boolean;
	spacing?: number;
}
