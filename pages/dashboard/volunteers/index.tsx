import "./volunteers.scss"
import React, {useEffect} from "react";
import useApi from "@/hooks/useApi/useApi";
import {Match} from "@/interfaces/Match";
import VolunteerSelection from "@/components/organisms/VolunteerSelection/VolunteerSelection";
import Cookies from "js-cookie";
import {useAuthRedirect} from "@/hooks/useAuthRedirect/useAuthRedirect";

export default function Volunteers() {
    const apiUrl = `/api/weekGames`;
    const { data, error, callApi } = useApi();

    useEffect(() => {
        const localTeamId = Cookies.get('localTeamId');

        const url = `${apiUrl}?local_team_id=${localTeamId}`;
        callApi(url);
    }, [apiUrl, callApi, data]);

    return (
        <article className={"volunteers"}>
            <h2>Bénévoles de la semaine</h2>
            {data.length === 0 ? (
                error ?
                    <p>Erreur lors du chargements des données</p>
                    :
                    <p>Pas de matchs disponibles</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Chronométreurs</th>
                        <th>Secrétaires</th>
                        <th>Responsable de salle</th>
                        <th>Buvette</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((match: Match) => (
                        <VolunteerSelection
                            key={match.id}
                            matchId={match.id}
                            visitorTeamName={match.visitorTeam.name}
                            matchCategory={match.category}
                            matchDate={match.gameDate}
                            isHomeMatch={match.isHomeMatch}
                            timekeepers={match.timekeepers}
                            roomManagers={match.roomManagers}
                            secretaries={match.secretaries}
                            drinkManagers={match.drinkManagers}
                            roomManagerId={match.roomManager?.id}
                            timekeeperId={match.timekeeper?.id}
                            secretaryId={match.secretary?.id}
                            drinkManagerId={match.drinkManager?.id}
                        />
                    ))}
                    </tbody>
                </table>
            )}
        </article>
    );
}

export const getServerSideProps = useAuthRedirect;
