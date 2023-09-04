import './Layout.scss'
import {Navigate, Outlet} from "react-router-dom";
import {slide as Menu} from "react-burger-menu";
import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";
import {useAuth} from "../../../hooks/useAuth";
import {NavlinkObject} from "../../interfaces/NavlinkObject";

interface LayoutProps {
    isAuthenticated?: boolean;
}


export default function Layout(props: LayoutProps) {
    const {token, logout} = useAuth();

    const navlinks :Array<NavlinkObject> = [
        {innerText: "Accueil",link: "/"},
        {innerText: "Les matchs",link: "/matchs"},
    ];
    if(!token){
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
                    {token &&
                        <a href="/dashboard">Dashboard</a>
                    }
                    {token &&
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