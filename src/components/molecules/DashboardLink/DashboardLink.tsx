import "./DashboardLink.scss"

interface DashboardLinkProps {
    innerText: string,
    link: string
}
export const DashboardLink = (props: DashboardLinkProps) => {
    return (
        <a href={props.link} about={`Lien vers ${props.innerText}`} className={"dashboard-link"}>
            <p>
                {props.innerText}
            </p>
        </a>
    );
};