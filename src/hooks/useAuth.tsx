import React, { createContext, useContext, useState } from 'react';
import apiClient from "../services/apiClient";

interface AuthContextType {
    token: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(
        sessionStorage.getItem('token') || null
    );

    const login = async (email: string, password: string) => {
        try {
            // First, get the CSRF cookie
            await apiClient.get('/sanctum/csrf-cookie');

            // Then, send the login request
            const response = await apiClient.post('/api/login', {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                const token = `${response.data["access_token"]}`;
                setToken(token);
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('loggedIn', 'true');
                return true;
            } else {
                sessionStorage.setItem('loggedIn', 'false');
                return false;
            }
        } catch (error) {
            sessionStorage.setItem('loggedIn', 'false');
            return false;
        }
    };


    const logout = () => {
        apiClient.post('/api/logout').then(response => {
            if (response.status === 200) {
                sessionStorage.setItem('loggedIn', 'false');
                setToken(null);
                sessionStorage.removeItem('token');
            }
        });
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
