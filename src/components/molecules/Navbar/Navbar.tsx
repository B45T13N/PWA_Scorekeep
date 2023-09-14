import './Navbar.scss'
import {Navlink} from "../../atoms/Navlink/Navlink";
import {Logout} from "../../atoms/Logout/Logout";
import {NavlinkObject} from "../../../interfaces/NavlinkObject";

export default function Navbar() {
    let isAuthenticated = sessionStorage.getItem("loggedIn") === 'true';

    const navlinks :Array<NavlinkObject> = [
        {innerText: "Accueil",link: "/"},
        {innerText: "Les équipes",link: "/local-teams"},
    ];
    if(!isAuthenticated){
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
                 {isAuthenticated &&
                     (<>
                         <li>
                             <Navlink link={"/dashboard"} innerText={"Dashboard"} isActive={url === "/dashboard"}/>
                         </li>
                         <li>
                             <Logout />
                         </li>
                     </>)
                 }
             </ul>
         </nav>
    )
}