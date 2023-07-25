import { createContext, useState, useContext, useEffect } from 'react';
import * as React from 'react';
import { ThemeProvider, CssBaseline, Theme, createTheme } from '@mui/material';
import LoadingOverlay from 'components/theme/LoadingOverlay/LoadingOverlay';
import api from 'utils/api';
import '@fontsource-variable/quicksand';

interface ThemeContextValues {
	loading: boolean;
	theme: Theme;
	toggleThemeMode: () => void;
}

const ThemeContext = createContext({} as ThemeContextValues);

export const ThemeContextProvider = ({ children }: React.PropsWithChildren) => {
	const [loaded, setLoaded] = useState(false);
	const [mode, setMode] = useState<'dark' | 'light'>('dark');
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		api.interceptors.request.use((config) => {
			setLoading(true);
			return config;
		});

		api.interceptors.response.use(
			(response) => {
				setLoading(false);
				return response;
			},
			(error) => {
				setLoading(false);
				return error;
			},
		);
		setLoaded(true);
	}, []);

	const toggleThemeMode = () => setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));

	const theme = React.useMemo(
		() =>
			createTheme({
				typography: {
					fontFamily: 'Quicksand Variable',
					allVariants: {
						letterSpacing: 1,
					},
				},
				palette: { mode },
			}),
		[mode],
	);

	return loaded ? (
		<ThemeContext.Provider value={{ loading, theme, toggleThemeMode }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<LoadingOverlay loading={loading} />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	) : null;
};

export default ThemeContextProvider;

export const useTheme = () => useContext(ThemeContext);
