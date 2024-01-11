import { Close } from '@mui/icons-material';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { createContext, useState, useContext, useEffect, SyntheticEvent } from 'react';
import api, { globalErrorHandler } from 'utils/api';

const ErrorContext = createContext(null);

export const ErrorProvider = ({ children }: any) => {
	const [loaded, setLoaded] = useState<boolean>(false);
	const [errorMsgs, setErrorMsgs] = useState<Array<string>>([]);

	useEffect(() => {
		globalErrorHandler(setErrorMsgs);
		setLoaded(true);
	}, []);

	const handleClose = (index: number) => {
		const newMsgs = [...errorMsgs];
		newMsgs.splice(index, 1);
		setErrorMsgs(newMsgs);
	};

	const errors = errorMsgs.map((msg, i) => (
		<Snackbar
			open
			autoHideDuration={6000}
			onClose={() => handleClose(i)}
			key={`error-${i}`}
			action={
				<IconButton onClick={() => handleClose(i)}>
					<Close />
				</IconButton>
			}
		>
			<Alert variant="filled" sx={{ width: '100%' }} severity="error">
				{msg}
			</Alert>
		</Snackbar>
	));

	return loaded ? (
		<ErrorContext.Provider value={null}>
			{children}
			{errors}
		</ErrorContext.Provider>
	) : null;
};

export default ErrorProvider;

// export const useErrors = () => useContext<ErrorContextProps>(ErrorContext);
