import './Header.scss'
import Navbar from "../../molecules/Navbar/Navbar";
import {slide as Menu} from "react-burger-menu";

export default function Header() {
    return (
        <header>
            <div className="logo-app">
                <a href="/">
                    <img src={"/logo192.png"} alt={"Logo de l'application Scorekeep"} width={120} height={120} />
                </a>
            </div>
            <div className={"app-title"}>
                <h1>SCOREKEEP</h1>
            </div>
            <div className={"links"}>
                <Navbar />
            </div>
        </header>
    )
}
