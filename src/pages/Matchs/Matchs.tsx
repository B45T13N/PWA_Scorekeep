import './Matchs.scss'
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import apiClient from "../../services/apiClient";
import {Match} from "../../interfaces/Match";
import MatchCard from "../../components/atoms/MatchCard/MatchCard";

export default function Matchs() {
    const { localTeamId } = useParams();
    const apiUrl = `${process.env.REACT_APP_API_SCOREKEEP_URL}/api/weekGames?local_team_id=${localTeamId}`;
    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState([]);


    useEffect(() => {
        apiClient.get(apiUrl)
            .then((result) =>{
                setData(result.data.data)
            })
            .catch((error) => {
            setError(true);
            console.log(error);
        })
    }, [apiUrl]);

    return (
        <article className="matchs-content">
            <h2>Les matchs</h2>
            {error ? (
                <p>Erreur lors de la récupération des équipes</p>
            ) : (
                <section className={"matchs-display"}>
                    {data.map((match: Match) => (
                        <MatchCard key={match.id} visitorTeamName={match.visitorTeam.name} category={match.category} date={match.gameDate} isHomeMatch={match.isHomeMatch}/>
                    ))}
                </section>
            )}
        </article>
    )
}
