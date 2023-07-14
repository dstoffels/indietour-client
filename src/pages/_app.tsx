import * as React from 'react';
import GlobalContextProvider from 'context/globalContext';
import PageLayout from 'components/core/PageLayout/PageLayout';
import 'themes/global.css';
import AuthProvider from 'context/authContext';

const App = ({ Component, props }: any) => {
	return (
		<AuthProvider>
			<GlobalContextProvider>
				<Component {...props} />
			</GlobalContextProvider>
		</AuthProvider>
	);
};

export default App;
