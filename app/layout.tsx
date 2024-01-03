'use client';
import './layout.scss'
import {slide as Menu} from "react-burger-menu";
import Header from "./components/organisms/Header/Header";
import Footer from "./components/organisms/Footer/Footer";
import {useAuth} from "./hooks/useAuth/useAuth";
import {NavlinkObject} from "./interfaces/NavlinkObject";
import {ReactNode} from "react";
import Link from "next/link";
import {useRouter} from "next/router";

interface LayoutProps {
    children: ReactNode;
}
export default function Layout(props: LayoutProps) {
    const {logout, isAuthenticated} = useAuth();

    const router = useRouter();

    const navlinks :Array<NavlinkObject> = [
        {innerText: "Accueil",link: "/"},
        {innerText: "Les équipes",link: "/teams"},
    ];

    if(!isAuthenticated){
        navlinks.push(
            {innerText: "Se connecter",link: "/login"}
        )
        if(router.pathname.startsWith('/dashboard'))
        {
            router.push('/login');
        }
    }

    return (
        <div className="page">
            <div id="slide">
                <Menu>
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
    )
}