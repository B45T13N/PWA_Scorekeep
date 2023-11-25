import './Header.scss'
import Navbar from "../../molecules/Navbar/Navbar";
import Link from "next/link";

export default function Header() {
    return (
        <header className={"app-header"}>
            <div className="logo-app hidden-xs">
                <Link href="/">
                    <img src={"/logo192.png"} alt={"Logo de l'application Scorekeep"} width={80} height={80} />
                </Link>
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
