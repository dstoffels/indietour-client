import * as React from 'react';
import 'themes/global.css';
import AuthProvider from 'context/authContext';
import ThemeContextProvider from 'context/themeContext';
import ErrorProvider from 'context/errorContext';
import BandProvider from 'context/bandContext';
import TourProvider from 'context/tourContext';
import DateProvider from 'context/dateContext';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App = ({ Component, pageProps }: any) => {
	return (
		<ErrorProvider>
			<ThemeContextProvider>
				<AuthProvider>
					<BandProvider>
						<TourProvider>
							<DateProvider>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<Component {...pageProps} />
								</LocalizationProvider>
							</DateProvider>
						</TourProvider>
					</BandProvider>
				</AuthProvider>
			</ThemeContextProvider>
		</ErrorProvider>
	);
};

export default App;
