import "./MatchCard.scss"
import moment from "moment";

interface MatchCardProps {
    visitorTeamName: string,
    category: string,
    date: Date,
    isHomeMatch: boolean
}

export default function MatchCard(props: MatchCardProps) {
    return (
        <div className={"match-card"}>
            <p>{props.visitorTeamName}</p>
            <p>{props.category}</p>
            {props.isHomeMatch ?
                <p>A domicile</p>
                :
                <></>
            }
            <p>{moment(props.date).format('DD/MM/YYYY HH:mm')}</p>
        </div>
    )
}