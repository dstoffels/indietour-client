import { createContext, useContext, useEffect, useState } from 'react';
import api from 'utils/api';

const defaultContext: AuthContextOutput = {
	user: null,
	login: async (credentials: LoginCredentials) => false,
	logout: async () => false,
	register: async (formData: RegiserFormData) => false,
};

const AuthContext = createContext<AuthContextOutput>(defaultContext);

const AuthProvider = ({ children }: any) => {
	const [user, setUser] = useState<object | null>(null);

	const login = async (credentials: LoginCredentials) => {
		try {
			const response = await api.post('/auth/login', credentials);
			setUser(response.data);
			return true;
		} catch (error) {
			throw error;
		}
	};

	const register = async (formData: RegiserFormData) => {
		try {
			const response = await api.post('/auth/register', formData);
			setUser(response.data);
			return true;
		} catch (error) {
			throw error;
		}
	};

	const refresh = async () => {
		try {
			const response = await api.post('/auth/refresh');
			setUser(response.data);
			return true;
		} catch (error: any) {
			console.log(error.response.data);
			return false;
		}
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

	useEffect(() => {
		refresh();
	}, [setUser]);

	return (
		<AuthContext.Provider value={{ user, login, logout, register }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => useContext<AuthContextOutput>(AuthContext);

export interface AuthContextOutput {
	user: object | null;
	login: loginFn;
	logout: logoutFn;
	register: registerFn;
}

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

type loginFn = (credentials: LoginCredentials) => Promise<boolean>;
type logoutFn = () => Promise<boolean>;
type registerFn = (formData: RegiserFormData) => Promise<boolean>;
