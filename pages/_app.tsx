import type { AppProps } from 'next/app'
import {AuthProvider} from "@/hooks/useAuth/useAuth";
import Layout from "../app/layout";
import '../styles/global.scss';
import {getCSRFToken} from "@/services/apiClient";
import {useEffect} from "react";
import {registerLocale} from "react-datepicker";
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);

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
