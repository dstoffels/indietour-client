import { createContext, useState, useContext, useEffect } from 'react';
import * as React from 'react';
import { ThemeProvider, CssBaseline, Theme, createTheme, useMediaQuery } from '@mui/material';
import LoadingOverlay from 'components/theme/LoadingOverlay/LoadingOverlay';
import api from 'utils/api';
import '@fontsource-variable/quicksand';

interface ThemeContextValues {
	loading: boolean;
	theme: Theme;
	toggleThemeMode: () => void;
	headerRef: React.MutableRefObject<HTMLDivElement | null>;
	headerHeight: number;
	footerRef: React.MutableRefObject<HTMLDivElement | null>;
	footerHeight: number;
	isMobile: boolean;
}

const ThemeContext = createContext({} as ThemeContextValues);

export const ThemeContextProvider = ({ children }: React.PropsWithChildren) => {
	const [mode, setMode] = useState<'dark' | 'light'>('dark');

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

	const [loaded, setLoaded] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [headerHeight, setHeaderHeight] = useState(0);
	const [footerHeight, setFooterHeight] = useState(0);

	const headerRef = React.useRef<HTMLDivElement | null>(null);
	const footerRef = React.useRef<HTMLDivElement | null>(null);

	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const handleWindowResize = () => {
		if (headerRef.current) {
			setHeaderHeight(headerRef.current.clientHeight);
		}

		if (footerRef.current) {
			setFooterHeight(footerRef.current.clientHeight);
		}
	};

	// init context
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

		window.addEventListener('resize', handleWindowResize);

		setLoaded(true);

		return () => window.removeEventListener('resize', handleWindowResize);
	}, []);

	useEffect(() => {
		handleWindowResize();
	}, [headerRef.current]);

	const toggleThemeMode = () => setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));

	return loaded ? (
		<ThemeContext.Provider
			value={{
				loading,
				theme,
				toggleThemeMode,
				headerRef,
				headerHeight,
				footerRef,
				footerHeight,
				isMobile,
			}}
		>
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
