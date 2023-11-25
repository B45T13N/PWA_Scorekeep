import type { AppProps } from 'next/app'
import {AuthProvider} from "../app/hooks/useAuth/useAuth";
import Layout from "../app/layout";
import '../styles/global.scss';
import AuthMiddleware from "../app/middleware/authMiddleware";

export default function MyApp({ Component, pageProps }: AppProps) {
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
