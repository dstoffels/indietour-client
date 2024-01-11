import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
	baseURL: process.env.API_BASE_URL,
	withCredentials: true,
});

export const globalErrorHandler = (setErrors: (errorMsgs: string[]) => void) => {
	// REQUEST INTERCEPTORS
	api.interceptors.request.use(
		(config) => {
			setErrors([]);
			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);

	// RESPONSE INTERCEPTORS
	api.interceptors.response.use(
		(response) => {
			return response;
		},
		(error: AxiosError) => {
			console.log(error.response?.data);
			if (error.response) {
				const { status } = error.response;
				const data = error.response.data as ErrorData;
				if (status === 400) {
					if (data.detail) {
						setErrors([data.detail as string]);
					} else {
						// const errors = Object.entries<[1]>(data).map(([key, msgs]) => `${key}: ${msgs[0]}`);
						// setErrors(errors);
					}
				} else if (status === 401) {
					if (data.detail === 'Authentication credentials were not provided.') {
					} else setErrors([data.detail as string]);
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
			return Promise.reject(error);
		},
	);
};

export default api;

interface ErrorData {
	detail: string;
}
