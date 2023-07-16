import lightTheme from 'themes/lightTheme';
import darkTheme from 'themes/darkTheme';
import { createContext, useState, useContext, useEffect } from 'react';
import * as React from 'react';
import { ThemeProvider, CssBaseline, Theme } from '@mui/material';
import LoadingOverlay from 'components/theme/LoadingOverlay/LoadingOverlay';
import api from 'utils/api';

export class ThemeContextProps {
	loading: boolean = true;
	theme: Theme;
	setTheme = (theme: Theme) => {};

	constructor(theme: Theme) {
		this.theme = theme;
	}
}

const defaultContext = new ThemeContextProps(darkTheme);

const ThemeContext = createContext(defaultContext);

export const ThemeContextProvider = ({ children }: React.PropsWithChildren) => {
	const [theme, setTheme] = useState(darkTheme);
	const [requests, setRequests] = useState<Array<number>>([]);
	const loading = Boolean(requests.length);

	useEffect(() => {
		api.interceptors.request.use((config) => {
			setRequests([...requests, requests.length]);
			return config;
		});

		api.interceptors.response.use(
			(response) => {
				requests.pop();
				setRequests([...requests]);
				return response;
			},
			(error) => {
				requests.pop();
				setRequests([...requests]);
				return error;
			},
		);
	}, []);

	return (
		<ThemeContext.Provider value={{ loading, theme, setTheme }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<LoadingOverlay loading={loading} />

				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};

export default ThemeContextProvider;

export const useTheme = () => {
	const { theme, setTheme } = useContext(ThemeContext);

	const toggleMode = () => {
		if (theme === darkTheme) setTheme(lightTheme);
		else setTheme(darkTheme);
	};

	return { theme, toggleMode };
};
