import "./Volunteers.scss"
import React, {useEffect, useState} from "react";
import RadioInput from "../../../components/atoms/RadioInput/RadioInput";
import VolunteerSelection from "../../../components/organisms/VolunteerSelection/VolunteerSelection";
import useApi from "../../../hooks/useApi/useApi";
import moment from "moment";
import {Match} from "../../../interfaces/Match";

export default function Volunteers() {
    const apiUrl = `${process.env.REACT_APP_API_SCOREKEEP_URL}/api/weekGames`;
    const { data, meta, error, callApi } = useApi();
    const localTeamId = sessionStorage.getItem('localTeamId');

    useEffect(() => {
        const url = `${apiUrl}?local_team_id=${localTeamId}`;
        callApi(url);
        console.log(data);
    }, [apiUrl, callApi, localTeamId, data]);

    return (
        <article className={"volunteers"}>
            <h2>Bénévoles de la semaine</h2>
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
        </article>
    );
}