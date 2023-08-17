import Header from "../../organisms/Header/Header";
import './Layout.scss'
import {Outlet} from "react-router-dom";
import {slide as Menu} from "react-burger-menu";
import {Footer} from "../../organisms/Footer/Footer";

export default function Layout() {
    return (
        <div className="page">
            <div id="slide">
                <Menu>
                    <a href="/" className={"active"}>Accueil</a>
                    <a href="/" className={"active"}>Accueil</a>
                    <a href="/" className={"active"}>Accueil</a>
                </Menu>
            </div>
            <Header/>
            <main className="content">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}