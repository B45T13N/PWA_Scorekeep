import './Teams.scss'
import TeamCard from "../../components/atoms/TeamCard/TeamCard";
import useApi from "../../hooks/useApi/useApi";
import {useEffect} from "react";
import {LocalTeam} from "../../interfaces/LocalTeam";

export default function Teams() {
    const apiUrl = `${process.env.REACT_APP_API_SCOREKEEP_URL}/api/local-teams`;
    const { data, error, callApi } = useApi();

    useEffect(() => {
        callApi(apiUrl);
    }, [apiUrl, callApi]);

    return (
        <article className="teams-content">
            <h2>Les clubs</h2>
            <section className={"teams-display"}>
                {error ? (
                    <p>Erreur lors de la récupération des équipes</p>
                ) : (
                    <section className={"teams-display"}>
                        {data.map((localTeam: LocalTeam) => (
                            <TeamCard key={localTeam.id} link={`/teams/${localTeam.id}`} teamName={localTeam.name} logoPath={localTeam.logo} />
                        ))}
                    </section>
                )}
            </section>
        </article>
    )
}
