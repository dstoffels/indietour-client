import * as React from 'react';
import 'themes/global.css';
import AuthProvider from 'context/authContext';
import ThemeContextProvider from 'context/themeContext';
import ErrorContextProvider from 'context/errorContext';
import BandProvider from 'context/bandContext';
import TourProvider from 'context/tourContext';
import DateProvider from 'context/dateContext';

const App = ({ Component, pageProps }: any) => {
	return (
		<ThemeContextProvider>
			<AuthProvider>
				<ErrorContextProvider>
					<BandProvider>
						<TourProvider>
							<DateProvider>
								<Component {...pageProps} />
							</DateProvider>
						</TourProvider>
					</BandProvider>
				</ErrorContextProvider>
			</AuthProvider>
		</ThemeContextProvider>
	);
};

export default App;
