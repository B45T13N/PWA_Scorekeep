'use client';
import './layout.scss'
import {slide as Menu} from "react-burger-menu";
import Header from "./components/organisms/Header/Header";
import Footer from "./components/organisms/Footer/Footer";
import {useAuth} from "./hooks/useAuth/useAuth";
import {NavlinkObject} from "./interfaces/NavlinkObject";
import {ReactNode} from "react";
import {useRouter} from "next/router";
import * as console from "console";

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

    if(true){
        navlinks.push(
            {innerText: "Se connecter",link: "/connexion"}
        )
    }

    return (
        <div className="page">
            <div id="slide">
                <Menu>
                    {navlinks.map((obj, key) =>
                        <a key={key} href={obj.link}>{obj.innerText}</a>
                    )}
                    {isAuthenticated &&
                        <a href="/dashboard">Dashboard</a>
                    }
                    {isAuthenticated &&
                        <a href="#" onClick={logout}>Se déconnecter</a>
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