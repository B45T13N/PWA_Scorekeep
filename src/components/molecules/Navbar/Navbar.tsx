import './Navbar.scss'
import {Navlink} from "../../atoms/Navlink/Navlink";
import {useAuth} from "../../../hooks/useAuth";
import {Logout} from "../../atoms/Logout/Logout";
import {NavlinkObject} from "../../interfaces/NavlinkObject";

export default function Navbar() {
    const {token} = useAuth();

    const navlinks :Array<NavlinkObject> = [
        {innerText: "Accueil",link: "/"},
        {innerText: "Les matchs",link: "/matchs"},
    ];
    if(!token){
        navlinks.push(
            {innerText: "Se connecter",link: "/connexion"}
        )
    }

    const url :string = window.location.pathname;

    return (
         <nav data-testid={"navbar"}>
             <ul className={"link-list"}>
                 {navlinks.map((obj, key) =>
                    <li key={key}><Navlink link={obj.link} innerText={obj.innerText} isActive={url === obj.link}/></li>
                 )}
                 {token &&
                    <li>
                        <Logout />
                    </li>
                 }
             </ul>
         </nav>
    )
}