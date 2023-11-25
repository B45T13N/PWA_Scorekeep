import type { AppProps } from 'next/app'
import {AuthProvider} from "@/hooks/useAuth/useAuth";
import Layout from "../app/layout";
import '../styles/global.scss';
import AuthMiddleware from "../app/middleware/authMiddleware";
import {getCSRFToken} from "@/services/apiClient";
import {useEffect} from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        getCSRFToken();
    }, []);

    return (
        <AuthProvider>
            <AuthMiddleware>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthMiddleware>
        </AuthProvider>
    )
}
