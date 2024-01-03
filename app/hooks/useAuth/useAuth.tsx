import React, {createContext, useContext, useEffect, useState} from 'react';
import apiClient from "../../services/apiClient";
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface AuthContextType {
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    me: () => void;
    isAuthenticated: boolean;
    localTeamId: number | undefined;
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
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [localTeamId, setLocalTeamId] = useState<number | undefined>(undefined);

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            if (token) {
                apiClient.defaults.headers.Authorization = `Bearer ${token}`
                await apiClient.post('api/me').then((response) =>{
                    setIsAuthenticated(true);
                    setLocalTeamId(parseInt(Cookies.get('localTeamId') ?? ''));
                }).catch(() => {
                    clearCookies();
                    if(router.pathname.startsWith('/dashboard'))
                    {
                        router.push('/login');
                    }
                })
            }
        }

        loadUserFromCookies()
    }, [])


    const setCookies = (token: string, localTeamId: number) => {
        Cookies.set('token', token, { expires: 1 });
        Cookies.set('localTeamId', localTeamId.toString(), { expires: 1 });
    };

    const clearCookies = () => {
        Cookies.remove('token');
        Cookies.remove('localTeamId');
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await apiClient.post('/api/login', { email, password });
            if (response.status === 200) {
                setLocalTeamId(response.data.local_team_id);
                const token = `${response.data.token_type} ${response.data.access_token}`;
                setCookies(token, response.data.local_team_id);
                setIsAuthenticated(true);
                return true;
            } else {
                clearCookies();
                setIsAuthenticated(false);
                return false;
            }
        } catch (error) {
            console.log(error);
            clearCookies();
            setIsAuthenticated(false);
            return false;
        }
    };

    const logout = async () => {
        try {
            const response = await apiClient.post('/api/logout');
            if (response.status === 200) {
                clearCookies();
                setIsAuthenticated(false);
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const me = () => {
        apiClient.post('/api/me').then(
            (response) => {
                if (response.status === 200) {
                    setLocalTeamId(response.data.user.localTeamId);
                    setIsAuthenticated(true);
                } else {
                    clearCookies();
                    setIsAuthenticated(false);
                }
            }
        ).catch(
            (error) => {
                clearCookies();
                setIsAuthenticated(false);
            }
        );
    };

    return (
        <AuthContext.Provider value={{ login, logout, me, isAuthenticated, localTeamId}}>
            {children}
        </AuthContext.Provider>
    );
};
