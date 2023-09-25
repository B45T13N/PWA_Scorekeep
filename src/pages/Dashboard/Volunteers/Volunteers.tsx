import "./Volunteers.scss"
import React, {useEffect} from "react";
import VolunteerSelection from "../../../components/organisms/VolunteerSelection/VolunteerSelection";
import useApi from "../../../hooks/useApi/useApi";
import {Match} from "../../../interfaces/Match";

export default function Volunteers() {
    const apiUrl = `${process.env.REACT_APP_API_SCOREKEEP_URL}/api/weekGames`;
    const { data, meta, error, callApi } = useApi();
    const localTeamId = sessionStorage.getItem('localTeamId');

    useEffect(() => {
        const url = `${apiUrl}?local_team_id=${localTeamId}`;
        callApi(url);
    }, [apiUrl, callApi, localTeamId, data]);

    return (
        <article className={"volunteers"}>
            <h2>Bénévoles de la semaine</h2>
            {data.length === 0 ? (
                <p>Pas de matchs disponibles</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Chronométreurs</th>
                        <th>Secrétaires</th>
                        <th>Responsable de salle</th>
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
                            roomManagerId={match.roomManager?.id}
                            timekeeperId={match.timekeeper?.id}
                            secretaryId={match.secretary?.id}
                        />
                    ))}
                    </tbody>
                </table>
            )}
        </article>
    );
}