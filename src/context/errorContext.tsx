import { Close } from '@mui/icons-material';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { createContext, useState, useContext, useEffect, SyntheticEvent } from 'react';
import api, { globalErrorHandler } from 'utils/api';

const ErrorContext = createContext(null);

export const ErrorContextProvider = ({ children }: any) => {
	const [errorMsgs, setErrorMsgs] = useState<Array<string>>([]);

	useEffect(() => {
		globalErrorHandler(setErrorMsgs);
	}, []);

	const handleClose = (index: number) => {
		const newMsgs = [...errorMsgs];
		newMsgs.splice(index, 1);
		setErrorMsgs(newMsgs);
	};

	const errors = errorMsgs.map((msg, i) => (
		<Snackbar
			open
			onClose={() => handleClose(i)}
			key={`error-${i}`}
			action={
				<IconButton onClick={() => handleClose(i)}>
					<Close />
				</IconButton>
			}
		>
			<Alert severity="error">{msg}</Alert>
		</Snackbar>
	));

	return (
		<ErrorContext.Provider value={null}>
			{children}
			{errors}
		</ErrorContext.Provider>
	);
};

export default ErrorContextProvider;

// export const useErrors = () => useContext<ErrorContextProps>(ErrorContext);
