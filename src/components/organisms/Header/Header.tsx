import './Header.scss'
import Navbar from "../../molecules/Navbar/Navbar";

export default function Header() {
    return (
        <header>
            <div className="logo-app hidden-xs">
                <a href="/">
                    <img src={"/logo192.png"} alt={"Logo de l'application Scorekeep"} width={80} height={80} />
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
