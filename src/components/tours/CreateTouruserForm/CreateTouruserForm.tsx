import {
	Box,
	Checkbox,
	FormControlLabel,
	ListSubheader,
	TextField,
	Typography,
} from '@mui/material';
import ButtonForm from 'components/core/ButtonForm/ButtonForm';
import useForm from 'hooks/useForm';
import * as React from 'react';
import { Touruser, useTours } from 'context/ourContext';

const CreateTouruserForm = () => {
	const initData: Touruser = { email: '', is_admin: false };
	const { isTourAdmin, createTouruser } = useTours();

	const { formData, handleChange, handleSubmit } = useForm(initData, createTouruser);

	const inputRef = React.useRef<HTMLInputElement | null>(null);

	const handleOpen = (open: boolean) => {
		if (open) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 1);
		}
	};

	return (
		isTourAdmin && (
			<ListSubheader>
				<ButtonForm
					fullWidth
					onSubmit={handleSubmit}
					btnText="Add Tour User"
					submitBtnTxt="Add User"
					onOpen={handleOpen}
				>
					<Box display="flex" alignItems="end" width="100%">
						<TextField
							autoFocus
							inputRef={inputRef}
							fullWidth
							variant="standard"
							name="email"
							label="Email"
							value={formData.email}
							onChange={handleChange}
						/>
						<FormControlLabel
							checked={formData.is_admin}
							// @ts-expect-error
							onChange={handleChange}
							name="is_admin"
							label={<Typography variant="caption">Admin</Typography>}
							labelPlacement="start"
							control={<Checkbox />}
						/>
					</Box>
				</ButtonForm>
			</ListSubheader>
		)
	);
};

export default CreateTouruserForm;
