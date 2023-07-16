import { createTheme } from '@mui/material';
import '@fontsource/titillium-web';
import '@fontsource-variable/quicksand';
import '@fontsource-variable/space-grotesk';

const darkTheme = createTheme({
	typography: {
		fontFamily: 'Quicksand Variable',
		allVariants: {
			letterSpacing: 1,
		},
	},
	palette: {
		mode: 'dark',
	},
});

export default darkTheme;
