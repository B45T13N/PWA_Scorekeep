import type { AppProps } from 'next/app'
import {AuthProvider} from "@/hooks/useAuth/useAuth";
import Layout from "../app/layout";
import '../styles/global.scss';
import {getCSRFToken} from "@/services/apiClient";
import {useEffect} from "react";
import AuthMiddleware from "@/app/middleware/authMiddleware";

export default function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        getCSRFToken();
    }, []);

    return (
        <AuthProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AuthProvider>
    )
}
