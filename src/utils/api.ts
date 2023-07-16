import axios, { AxiosError } from 'axios';

const api = axios.create({
	baseURL: '/api',
});

export const globalErrorHandler = (setErrors: (errorMsgs: Array<string>) => void) => {
	api.interceptors.request.use(
		(config) => {
			setErrors([]);
			return config;
		},
		(error) => {
			throw error;
		},
	);

	api.interceptors.response.use(
		(response) => response,
		(error: AxiosError<ErrorData> | any) => {
			if (error.response) {
				const { status, data } = error.response;
				if (status === 400) {
					if (data.detail) {
						setErrors([data.detail]);
					} else {
						console.log();
						const errors = Object.entries<[1]>(data).map(([key, msgs]) => `${key}: ${msgs[0]}`);
						setErrors(errors);
					}
				} else if (status === 401) {
					setErrors([data.detail]);
				} else if (status === 404) {
					setErrors(['Not Found']);
				} else if (status === 500) {
					setErrors(['Server Error']);
				}
				// ... Handle other status codes or error scenarios
			} else if (error.request) {
				// The request was made but no response was received
				// Handle network errors or request timeouts
			} else {
				// Something happened in setting up the request
				// Handle other types of errors
			}
			return error;
		},
	);
};

export default api;

interface ErrorData {
	detail: string;
}
