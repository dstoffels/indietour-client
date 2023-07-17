import * as React from 'react';
import 'themes/global.css';
import AuthProvider from 'context/authContext';
import ThemeContextProvider from 'context/themeContext';
import ErrorContextProvider from 'context/errorContext';

const App = ({ Component, pageProps }: any) => {
	return (
		<ThemeContextProvider>
			<AuthProvider>
				<ErrorContextProvider>
					<Component {...pageProps} />
				</ErrorContextProvider>
			</AuthProvider>
		</ThemeContextProvider>
	);
};

export default App;
