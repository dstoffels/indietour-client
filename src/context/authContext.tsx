import { createContext, useContext, useEffect, useState } from 'react';
import api from 'utils/api';

export class AuthContextValues {
	user: User | null = null;
	login = async (credentials: LoginCredentials) => false;
	logout = async () => false;
	register = async (formData: RegisterFormData) => false;
	refresh = async () => false;
	updateUser = async (data: object) => false;
	verifyUser = async (verification_code: string) => false;
	resendCode = async () => '';
}

const defaultContext = new AuthContextValues();

const AuthContext = createContext<AuthContextValues>(defaultContext);

const AuthProvider = ({ children }: any) => {
	const [loaded, setLoaded] = useState<boolean>(false);
	const [user, setUser] = useState<User | null>(null);

	const fetchUser = async () => {
		const response = await api.get('/auth/user');
		const userData = response.data;

		if (userData) {
			setUser(response.data);
			return true;
		}
		setUser(null);
		return false;
	};

	// Fetch user on first load
	useEffect(() => {
		fetchUser();
		setLoaded(true);
	}, []);

	const login = async (credentials: LoginCredentials) => {
		const response = await api.post('/auth/login', credentials);
		setUser(response.data);
		return true;
	};

	const register = async (formData: RegisterFormData) => {
		const response = await api.post('/auth/register', formData);
		setUser(response.data);
		return true;
	};

	const refresh = async () => {
		const response = await api.post('/auth/refresh');
		const userData = response.data;
		if (userData) {
			setUser(response.data);
			return true;
		}
		setUser(null);
		return false;
	};

	const logout = async () => {
		const success = await refresh();
		if (success) {
			try {
				const response = await api.post('/auth/logout');
				setUser(null);
				return true;
			} catch (error: any) {
				console.log(error.response.data);
				return false;
			}
		}
		return false;
	};

	const updateUser = async (data: object) => {
		try {
			const response = await api.patch('/auth/user', data);
			setUser(response.data);
			return true;
		} catch (error: any) {
			console.log(error.response.data);
			return false;
		}
	};

	const verifyUser = async (verification_code: string) => {
		const response = await api.post('/auth/verify', { verification_code });
		const userData = response.data;
		if (userData) {
			setUser(userData);
			return true;
		}
		return false;
	};

	const resendCode = async () => {
		const response = await api.get('/auth/verify');
		return response.data.detail;
	};

	return loaded ? (
		<AuthContext.Provider
			value={{ user, login, logout, register, refresh, updateUser, verifyUser, resendCode }}
		>
			{children}
		</AuthContext.Provider>
	) : null;
};

export default AuthProvider;

export const useAuth = () => useContext<AuthContextValues>(AuthContext);

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterFormData {
	email: string;
	username: string;
	password: string;
	password2: string;
}

export interface User {
	email: string;
	username: string;
	is_active: boolean;
	email_verified: boolean;
	active_band_id: string;
	active_tour_id: string;
}
