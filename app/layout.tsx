'use client';
import './layout.scss'
import {slide as Menu} from "react-burger-menu";
import Header from "./components/organisms/Header/Header";
import Footer from "./components/organisms/Footer/Footer";
import {useAuth} from "./hooks/useAuth/useAuth";
import {NavlinkObject} from "./interfaces/NavlinkObject";

interface LayoutProps {
    isAuthenticated?: boolean;
}


export default function Layout(props: LayoutProps) {
    const {logout} = useAuth();
    let isAuthenticated = sessionStorage.getItem("loggedIn") === 'true';

    const navlinks :Array<NavlinkObject> = [
        {innerText: "Accueil",link: "/"},
        {innerText: "Les équipes",link: "/teams"},
    ];
    if(!isAuthenticated){
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
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a href="#" onClick={logout}>Se déconnecter</a>
                    }
                </Menu>
            </div>
            <Header />
            <main className="content">
                {props.isAuthenticated !== false ? <Outlet/> : <Navigate to="/"/>}
            </main>
            <Footer />
        </div>
    )
}