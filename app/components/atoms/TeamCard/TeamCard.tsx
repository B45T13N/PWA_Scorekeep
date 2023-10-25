import "./TeamCard.scss"

interface TeamCardProps {
    teamName: string,
    logoPath: string,
    link: string
}

export default function TeamCard(props: TeamCardProps) {
    return (
        <a href={props.link}>
            <div className={"team-card"}>
                <img src={props.logoPath} alt="Logo de l'équipe" height={80} width={80}/>
                <p>{props.teamName}</p>
            </div>
        </a>
    )
}