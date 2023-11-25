import './teams.scss'
import TeamCard from "@/components/atoms/TeamCard/TeamCard";
import useApi from "@/hooks/useApi/useApi";
import {useEffect} from "react";
import {LocalTeam} from "@/interfaces/LocalTeam";

export default function Teams() {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_SCOREKEEP_URL}/api/local-teams`;
    const { data, error, callApi } = useApi();

    useEffect(() => {
        callApi(apiUrl);
    }, [apiUrl, callApi]);

    return (
        <article className="teams-content">
            <h2>Les clubs</h2>
            {error ? (
                <p>Erreur lors de la récupération des équipes</p>
            ) : (
                <section className={"teams-display"}>
                    {data.map((localTeam: LocalTeam) => (
                        <TeamCard key={localTeam.id} link={`/matchs/${localTeam.id}`} teamName={localTeam.name} logoPath={localTeam.logo} />
                    ))}
                </section>
            )}
        </article>
    )
}