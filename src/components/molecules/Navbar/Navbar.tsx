import './Navbar.scss'

export default function Navbar() {

    return (
         <nav>
             <ul className={"link-list"}>
                 <li><a href="/" className={"active"}>Accueil</a></li>
                 <li><a href="/">Les matchs</a></li>
                 <li><a href="/">Se connecter</a></li>
             </ul>
         </nav>
    )
}