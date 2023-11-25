import { useRouter } from 'next/router';
import {ReactNode, useEffect} from 'react';
import {useAuth} from "../hooks/useAuth/useAuth";

interface AuthMiddlewareProps {
    children: ReactNode;
}

const AuthMiddleware = (props: AuthMiddlewareProps) => {
    const { isAuthenticated, me } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            if(router.pathname.startsWith('/dashboard')){
                me();
                if(!isAuthenticated){
                    router.push('/connexion');
                }
            }
        };

        checkAuth();
        
    }, [isAuthenticated, router]);

    return props.children;
};

export default AuthMiddleware;
