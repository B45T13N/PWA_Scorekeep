import "./Footer.scss"

export const Footer = () => {
    return (
        <footer>
            <div className={"footer-link"}>
                <a href="/">A propos</a>
                <a href="/">Nous contacter</a>
                <a href="/">Politique de confidentialité</a>
            </div>
            <div className={"copyright"}>
                <h5>Tous droits réservés - &copy; Bastien DA SILVA</h5>
            </div>
        </footer>
    );
};
