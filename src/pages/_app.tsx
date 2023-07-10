import * as React from 'react';
import GlobalContextProvider from 'context/globalContext';
import PageLayout from 'components/core/PageLayout/PageLayout';
import 'themes/global.css';

const App = ({ Component, props }: any) => {
	return (
		<GlobalContextProvider>
			<PageLayout>
				<Component {...props} />
			</PageLayout>
		</GlobalContextProvider>
	);
};

export default App;
