import {
	Box,
	Button,
	Collapse,
	IconButton,
	ListItemIcon,
	MenuItem,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import SideStack from '../SideStack/SideStack';
import { Add, Check, Close } from '@mui/icons-material';
import { useTheme } from 'context/globalContext';

const ButtonForm = ({
	btnText,
	btnIcon,
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
		<>
			<Collapse in={showForm} timeout={timeout}>
				<Box component="form" onSubmit={handleSubmit} padding={1}>
					<Stack spacing={1}>
						<Stack spacing={spacing}>{children}</Stack>
						<SideStack justifyContent="end" spacing={1}>
							<Tooltip title="Submit">
								<IconButton size="large" color="info" type="submit" disabled={disabled}>
									<Check />
								</IconButton>
							</Tooltip>
							<Tooltip title="Cancel">
								<IconButton color="error" onClick={handleShowForm}>
									<Close />
								</IconButton>
							</Tooltip>
						</SideStack>
						{info && <Typography variant="caption">{info}</Typography>}
					</Stack>
				</Box>
			</Collapse>
			<Collapse in={!showForm} timeout={timeout}>
				<Button size="large" startIcon={btnIcon} onClick={handleShowForm}>
					{btnText}
				</Button>
			</Collapse>
		</>
	);
};

export default ButtonForm;

interface ButtonFormProps {
	btnText: string;
	btnIcon?: React.ReactNode;
	onSubmit: (e: React.FormEvent) => void;
	children: React.ReactNode;
	info?: string;
	autoclose?: boolean;
	timeout?: number;
	disabled?: boolean;
	spacing?: number;
}
