import { Alert, Box, Button, Grid, Snackbar, Stack, TextField, Typography } from '@mui/material';
import NumberField from 'components/core/NumberField/NumberField';
import BasePage from 'components/page/BasePage/BasePage';
import PrivatePage from 'components/page/PrivatePage/PrivatePage';
import { useAuth } from 'context/authContext';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';

const VerifyPage = ({}) => {
	const [verification_code, setVerificationCode] = useState('');
	const [msg, setMsg] = useState('');

	const { user, verifyUser, resendCode } = useAuth();
	const { push } = useRouter();

	useEffect(() => {
		if (verification_code.length === 6) {
			const success = verifyUser(verification_code);
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
		push('/tour');
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
						Please enter the verification code sent to your email address when you signed up.
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
