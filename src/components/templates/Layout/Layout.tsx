import './Layout.scss'
import {Outlet} from "react-router-dom";
import {slide as Menu} from "react-burger-menu";
import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";

export default function Layout() {
    return (
        <div className="page">
            <div id="slide">
                <Menu>
                    <a href="/">Accueil</a>
                    <a href="/matchs">Les matchs</a>
                    <a href="/connexion">Se connecter</a>
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