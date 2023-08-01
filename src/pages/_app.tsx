import * as React from 'react';
import 'themes/global.css';
import AuthProvider from 'context/AuthContext';
import ThemeContextProvider from 'context/ThemeContext';
import ErrorProvider from 'context/errorContext';
import BandProvider from 'context/BandContext';
import TourProvider from 'context/TourContext';
import DateProvider from 'context/DateContext';
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
						<GlobalProvider>
							<BandProvider>
								<TourProvider>
									<DateProvider>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<Component {...pageProps} />
										</LocalizationProvider>
									</DateProvider>
								</TourProvider>
							</BandProvider>
						</GlobalProvider>
					</AuthProvider>
				</ThemeContextProvider>
			</ErrorProvider>
		</>
	);
};

export default App;
