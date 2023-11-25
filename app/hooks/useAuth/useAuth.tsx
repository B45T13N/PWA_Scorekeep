import React, {createContext, useContext, useEffect, useState} from 'react';
import apiClient from "../../services/apiClient";

interface AuthContextType {
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    me: () => void;
    isAuthenticated: boolean;
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
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const login = async (email: string, password: string) => {
        try {
            // Then, send the login request
            const response = await apiClient.post('/api/login', {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                sessionStorage.setItem('localTeamId', response.data.local_team_id);
                sessionStorage.setItem('Authorization', `${response.data.token_type} ${response.data.access_token}`);
                setIsAuthenticated(true);
                return true;
            } else {
                sessionStorage.setItem('localTeamId', '');
                sessionStorage.setItem('Authorization', '');
                setIsAuthenticated(false);
                return false;
            }
        } catch (error) {
            console.log(error);
            sessionStorage.setItem('localTeamId', '');
            sessionStorage.setItem('Authorization', '');
            setIsAuthenticated(false);
            return false;
        }
    };

    const logout = () => {
        apiClient.post('/api/logout').then(response => {
            if (response.status === 200) {
                apiClient.defaults.headers.common['Authorization'] = "";
                sessionStorage.setItem('localTeamId', '');
                sessionStorage.setItem('Authorization', '');
                setIsAuthenticated(false);
            }
        }).catch(error => {
            console.log(error)
        });

    };

    const me = async () => {
        try{
            await apiClient.post('/api/me').then(response => {
                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    sessionStorage.setItem('localTeamId', '');
                    sessionStorage.setItem('Authorization', '');
                    setIsAuthenticated(false);
                }
            });
        } catch (error) {
            sessionStorage.setItem('localTeamId', '');
            sessionStorage.setItem('Authorization', '');
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{ login, logout, me, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
