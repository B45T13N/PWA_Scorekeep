import './Navbar.scss'
import {Navlink} from "../../atoms/Navlink/Navlink";
interface NavlinkObject {
    innerText: string,
    link: string
}

export default function Navbar() {
    const navlinks :Array<NavlinkObject> = [
        {innerText: "Accueil",link: "/"},
        {innerText: "Les matchs",link: "/matchs"},
        {innerText: "Se connecter",link: "/connexion"},
    ];

    const url :string = window.location.pathname;

    return (
         <nav data-testid={"navbar"}>
             <ul className={"link-list"}>
                 {navlinks.map((obj, key) =>
                     // eslint-disable-next-line eqeqeq
                    <li key={key}><Navlink link={obj.link} innerText={obj.innerText} isActive={url == obj.link}/></li>
                 )}
             </ul>
         </nav>
    )
}