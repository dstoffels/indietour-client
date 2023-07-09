import { createContext, useState, useContext } from 'react';
import lightTheme from 'themes/lightTheme.js';
import darkTheme from 'themes/darkTheme.js';
import { ThemeProvider, CssBaseline } from '@mui/material';

const GlobalContext = createContext({ theme: darkTheme, setTheme: (any: any) => {} });

export const GlobalContextProvider = ({ children }: any) => {
	const [theme, setTheme] = useState(darkTheme);
	return (
		<GlobalContext.Provider value={{ theme, setTheme }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</GlobalContext.Provider>
	);
};

export default GlobalContextProvider;

export const useGlobals = () => {
	return useContext(GlobalContext);
};

export const useTheme = () => {
	const { theme, setTheme } = useGlobals();

	const toggleMode = () => {
		if (theme === darkTheme) setTheme(lightTheme);
		else setTheme(darkTheme);
	};

	return { theme, toggleMode };
};
