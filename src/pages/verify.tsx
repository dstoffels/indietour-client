import { Alert, Box, Button, Grid, Snackbar, Stack, Typography } from '@mui/material';
import NumberField from 'components/core/NumberField/NumberField';
import BasePage from 'components/page/BasePage/BasePage';
import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';

const VerifyPage = ({}) => {
	const [verification_code, setVerificationCode] = useState('');
	const [msg, setMsg] = useState('');

	const { user, verifyUser, resendCode, logout } = useAuth();
	const { push } = useRouter();

	useEffect(() => {
		if (verification_code.length === 6) {
			verifyUser(verification_code);
		}
	}, [verification_code]);

	const handleResend = async () => {
		const resendMsg = await resendCode();
		setMsg(resendMsg);
	};

	const handleClose = () => {
		setMsg('');
	};

	if (!user) {
		push('/');
		return null;
	}

	if (user.email_verified) {
		user.booking_mode ? push('/booking') : push('/tour');
		return null;
	}

	return (
		<BasePage>
			<Grid
				component="section"
				container
				padding={2}
				justifyContent="center"
				textAlign="center"
				alignItems="center"
			>
				<Stack maxWidth={500} spacing={2}>
					<Typography variant="h5">Verify Email</Typography>
					<Typography>
						Please enter the verification code sent to {user.email} when you signed up.
					</Typography>
					<Box>
						<NumberField
							value={verification_code}
							onChange={(e) => setVerificationCode(e.target.value)}
						/>
					</Box>
					<Box>
						<Button onClick={handleResend}>Resend Code</Button>
					</Box>
					<Box>
						<Button color="warning" onClick={logout}>
							Log Out
						</Button>
					</Box>
				</Stack>
			</Grid>
			<Snackbar open={Boolean(msg)} onClose={handleClose} autoHideDuration={6000}>
				<Alert variant="filled" severity="success">
					{msg}
				</Alert>
			</Snackbar>
		</BasePage>
	);
};

export default VerifyPage;
