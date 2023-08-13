import "./Footer.scss"
import {FooterLink} from "../../atoms/FooterLink/FooterLink";

interface FooterLinkProps {
    link: string,
    innerText: string
}

export const Footer = () => {
    const footerLinks :Array<FooterLinkProps> = [
        {link: "/about", innerText: "A propos"},
        {link: "/contact", innerText: "Nous contacter"},
        {link: "/cgu", innerText: "Conditions générales d'utilisations"}
    ]

    return (
        <footer>
            <div className={"footer-link"}>
                {footerLinks.map((obj, key) =>
                    <FooterLink link={obj.link} innerText={obj.innerText} key={key}/>
                )}
            </div>
            <div className={"copyright"}>
                <h5>Tous droits réservés - &copy; Bastien DA SILVA</h5>
            </div>
        </footer>
    );
};
