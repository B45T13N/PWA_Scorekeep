'use client';
import './Navbar.scss'
import {Navlink} from "../../atoms/Navlink/Navlink";
import {Logout} from "../../atoms/Logout/Logout";
import {NavlinkObject} from "@/interfaces/NavlinkObject";
import {useAuth} from "@/app/hooks/useAuth/useAuth";
import {useRouter} from "next/router";

export default function Navbar() {

    const {isAuthenticated} = useAuth();
    const navlinks :Array<NavlinkObject> = [
        {innerText: "Accueil",link: "/"},
        {innerText: "Les équipes",link: "/teams"},
    ];

    if(!isAuthenticated){
        navlinks.push(
            {innerText: "Se connecter",link: "/login"}
        )
    }

    const url = useRouter().pathname;

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