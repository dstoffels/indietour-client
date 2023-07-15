import { createContext, useState, useContext, useEffect } from 'react';
import lightTheme from 'themes/lightTheme.js';
import darkTheme from 'themes/darkTheme.js';
import { ThemeProvider, CssBaseline, Theme } from '@mui/material';
import api from 'utils/api';
import LoadingOverlay from 'components/LoadingOverlay/LoadingOverlay';

const defaultContext: GlobalContextProps = {
	waiting: false,
	setWaiting: function (waiting: boolean): void {},
	theme: darkTheme,
	setTheme: function (theme: Theme): void {},
};

const GlobalContext = createContext(defaultContext);

export const GlobalContextProvider = ({ children }: any) => {
	const [theme, setTheme] = useState(darkTheme);
	const [waiting, setWaiting] = useState<boolean>(false);

	useEffect(() => {
		api.interceptors.request.use((config) => {
			setWaiting(true);
			return config;
		});

		api.interceptors.response.use(
			(response) => {
				setWaiting(false);
				return response;
			},
			(error) => {
				setWaiting(false);
				return error;
			},
		);
	}, []);

	return (
		<GlobalContext.Provider value={{ theme, setTheme, waiting, setWaiting }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
				<LoadingOverlay waiting={waiting} />
			</ThemeProvider>
		</GlobalContext.Provider>
	);
};

export default GlobalContextProvider;

export const useGlobals = () => useContext<GlobalContextProps>(GlobalContext);

export const useTheme = () => {
	const { theme, setTheme } = useGlobals();

	const toggleMode = () => {
		if (theme === darkTheme) setTheme(lightTheme);
		else setTheme(darkTheme);
	};

	return { theme, toggleMode };
};

interface GlobalContextProps {
	waiting: boolean;
	setWaiting: (waiting: boolean) => void;
	theme: Theme;
	setTheme: (theme: Theme) => void;
}
