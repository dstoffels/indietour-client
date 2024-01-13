import * as React from 'react';
import 'themes/global.css';
import AuthProvider from 'context/AuthContext';
import ThemeContextProvider from 'context/ThemeContext';
import ErrorProvider from 'context/ErrorContext';
import BandProvider from 'context/BandContext';
import TourProvider from 'context/TourContext';
import DateProvider from 'context/ateContext';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Head from 'next/head';
import GlobalProvider from 'context/GlobalContext';

const App = ({ Component, pageProps }: any) => {
	return (
		<>
			<Head>
				<title>indietour</title>
			</Head>
			<ErrorProvider>
				<ThemeContextProvider>
					<AuthProvider>
						<BandProvider>
							<TourProvider>
								<DateProvider>
									<GlobalProvider>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<Component {...pageProps} />
										</LocalizationProvider>
									</GlobalProvider>
								</DateProvider>
							</TourProvider>
						</BandProvider>
					</AuthProvider>
				</ThemeContextProvider>
			</ErrorProvider>
		</>
	);
};

export default App;
