'use client'
import './layout.scss'
import {slide as Menu, State} from "react-burger-menu";
import Header from "./components/organisms/Header/Header";
import Footer from "./components/organisms/Footer/Footer";
import {useAuth} from "./hooks/useAuth/useAuth";
import {NavlinkObject} from "./interfaces/NavlinkObject";
import {ReactNode, useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import Head from "next/head";

interface LayoutProps {
    children: ReactNode;
}
export default function Layout(props: LayoutProps) {
    const {logout, isAuthenticated} = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const handleStateChange = (state: State) => {
        setMenuOpen(state.isOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleRouteChange = () => {
            closeMenu();
        };

        router.events.on('routeChangeStart', handleRouteChange);

        // Nettoyer l'abonnement aux événements lors du démontage du composant
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router.events]);

    const navlinks :Array<NavlinkObject> = [
        {innerText: "Accueil",link: "/"},
        {innerText: "Les équipes",link: "/teams"},
    ];

    if(!isAuthenticated){
        navlinks.push(
            {innerText: "Se connecter",link: "/login"}
        )
    }

    return (
        <>
            <Head>
                <title>Scorekeep</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <div className="page">
                <div id="slide">
                    <Menu isOpen={menuOpen} onStateChange={handleStateChange}>
                        {navlinks.map((obj, key) =>
                            <Link key={key} href={obj.link}>{obj.innerText}</Link>
                        )}
                        {isAuthenticated &&
                            <Link href="/dashboard">Dashboard</Link>
                        }
                        {isAuthenticated &&
                            <Link href="#" onClick={logout}>Se déconnecter</Link>
                        }
                    </Menu>
                </div>
                <Header />
                <main className="content">
                    {props.children}
                </main>
                <Footer />
            </div>
        </>
            )
}