import * as React from 'react';
import GlobalContextProvider from 'context/globalContext';
import 'themes/global.css';
import AuthProvider from 'context/authContext';
import ThemeContextProvider from 'context/themeContext';
import ErrorContextProvider from 'context/errorContext';

const App = ({ Component, props }: any) => {
	return (
		<ThemeContextProvider>
			<AuthProvider>
				<GlobalContextProvider>
					<ErrorContextProvider>
						<Component {...props} />
					</ErrorContextProvider>
				</GlobalContextProvider>
			</AuthProvider>
		</ThemeContextProvider>
	);
};

export default App;
