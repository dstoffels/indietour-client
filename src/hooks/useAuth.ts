import { useEffect, useState } from 'react';
import api from 'utils/api';
import useLocalStorage from './useLocalStorage';

const useAuth = () => {
	const [user, setUser] = useLocalStorage<object>('user');

	const login = async (credentials: LoginCredentials) => {
		try {
			const response = await api.post('/auth/login', credentials);
			setUser(response.data);
		} catch (error) {
			throw error;
		}
	};

	const logout = async () => {
		try {
			const response = await api.post('/auth/logout');
			setUser(response.data);
		} catch (error: any) {
			console.log(error.response.data);
		}
	};

	return { user, login, logout };
};

// export default useAuth;

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegiserFormData {
	email: string;
	username: string;
	password: string;
	password2: string;
}
