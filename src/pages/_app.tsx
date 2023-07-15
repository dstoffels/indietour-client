import * as React from 'react';
import GlobalContextProvider from 'context/globalContext';
import BasePage from 'components/page/BasePage/BasePage';
import 'themes/global.css';
import AuthProvider from 'context/authContext';

const App = ({ Component, props }: any) => {
	return (
		<GlobalContextProvider>
			<AuthProvider>
				<Component {...props} />
			</AuthProvider>
		</GlobalContextProvider>
	);
};

export default App;
