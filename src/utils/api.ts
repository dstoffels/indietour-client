import axios from 'axios';

const api = axios.create({
	baseURL: '/api',
});

export default api;

// import axios, { AxiosInstance, AxiosResponse } from 'axios';

// class APIManager {
// 	axios: AxiosInstance;

// 	constructor() {
// 		this.axios = axios.create({
// 			baseURL: '/api',
// 		});
// 	}

// 	get = async (path: string, callback: Function) => {
// 		const response = await this.axios.get(path);
// 		callback(response.data);
// 	};

// }

// const api = new APIManager();

// export default api;
