import "./FooterLink.scss"

interface FooterLinkProps {
    link: string,
    innerText: string
}

export const FooterLink = (props: FooterLinkProps) => {
    return (
        <a className={"footer-link"} href={props.link} about={`Lien vers ${props.innerText}`}>{props.innerText}</a>
    );
};
