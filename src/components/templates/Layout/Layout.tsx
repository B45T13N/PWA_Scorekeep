import './Layout.scss'
import {Outlet} from "react-router-dom";
import {slide as Menu} from "react-burger-menu";
import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";
import {useAuth} from "../../../hooks/useAuth";
import {NavlinkObject} from "../../interfaces/NavlinkObject";

export default function Layout() {
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
                    {token && <a href="#" onClick={logout}>Se déconnecter</a>
                    }
                </Menu>
            </div>
            <Header />
            <main className="content">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}