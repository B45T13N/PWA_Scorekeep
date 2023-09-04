    import React, { createContext, useContext } from 'react';
    import apiClient from "../services/apiClient";
    import {useNavigate} from "react-router-dom";

    interface AuthContextType {
        login: (email: string, password: string) => Promise<boolean>;
        logout: () => void;
        me: () => void;
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
                    document.location = "/";
                }
            });

        };

        const me = async () => {
            try{
                await apiClient.post('/api/me').then(response => {
                    if (response.status === 200) {
                        console.log(response)
                        sessionStorage.setItem('loggedIn', 'true');
                    } else {
                        sessionStorage.setItem('loggedIn', 'false');
                    }
                });
            } catch (error) {
                sessionStorage.setItem('loggedIn', 'false');
            }
        };

        me();

        return (
            <AuthContext.Provider value={{ login, logout, me }}>
                {children}
            </AuthContext.Provider>
        );
    };
