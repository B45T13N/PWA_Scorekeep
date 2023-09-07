import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import useApi from '../../../hooks/useApi/useApi';
import './DashboardMatchs.scss';
import {Match} from "../../../interfaces/Match";
import moment from "moment";

export default function DashboardMatchs() {
    const apiUrl = `${process.env.REACT_APP_API_SCOREKEEP_URL}/api/games`;
    // Use the useApi hook to fetch data
    const { data, error, callApi } = useApi();

    useEffect(() => {
        // Call the API when the component mounts
        callApi(apiUrl);

    }, [apiUrl, callApi]);

    return (
        <article className="dashboard-matchs">
            <h1>Matchs Dashboard</h1>

            <section className="content">
                <div className="add-match-button">
                    <Link to="/match/add">
                        <button>Add Match</button>
                    </Link>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Date du match</th>
                        <th>Contre</th>
                        <th>Catégorie</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {error && <h2>Erreur lors de la récupération des matchs</h2>}
                    {data.map((match: Match) => (
                        <tr key={match.id}>
                            <td>{(moment(match.gameDate)).format("DD/MM/YYYY HH:mm")}</td>
                            <td>{match.visitorTeam.name}</td>
                            <td>{match.category}</td>
                            <td>
                                <Link to={`/match/edit/${match.id}`}>
                                    <button>Edit</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </article>
    );
}
