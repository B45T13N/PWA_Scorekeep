import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../../../hooks/useApi/useApi';
import './DashboardMatchs.scss';
import { Match } from '../../../interfaces/Match';
import moment from 'moment';

export default function DashboardMatchs() {
    const apiUrl = `${process.env.REACT_APP_API_SCOREKEEP_URL}/api/games`;
    const localTeamId = sessionStorage.getItem('localTeamId');
    const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().add("2", "w").format('YYYY-MM-DD'));
    const [currentPage, setCurrentPage] = useState(1);
    const { data, meta, error, callApi } = useApi();

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < meta.last_page) {
            setCurrentPage(currentPage + 1);
        }
    };

    useEffect(() => {
        const url = `${apiUrl}?page=${currentPage}&per_page=${meta.per_page}&$&local_team_id=${localTeamId}&start_date=${startDate}&end_date=${endDate}`;
        callApi(url);
    }, [apiUrl, callApi, currentPage, meta.per_page, startDate, endDate, localTeamId]);

    return (
        <article className="dashboard-matchs">
            <h1>Matchs Dashboard</h1>
            <section className="filter-section">
                <div className={"date-filters"}>
                    <div className="date-filter">
                        <label htmlFor="startDate">Date de début:</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="date-filter">
                        <label htmlFor="endDate">Date de fin:</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="add-match-button">
                    <Link to="/dashboard/matchs/add">
                        <button>Ajouter un match</button>
                    </Link>
                </div>
                {error && <h2>Erreur lors de la récupération des matchs</h2>}
                <table>
                    <thead>
                    <tr>
                        <th>Date du match</th>
                        <th className={'hidden-s'}>Contre</th>
                        <th>Catégorie</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((match: Match) => (
                        // Table rows
                        <tr key={match.id}>
                            <td>{moment(match.gameDate).format('DD/MM/YYYY HH:mm')}</td>
                            <td className={'hidden-s'}>{match.visitorTeam.name}</td>
                            <td>{match.category}</td>
                            <td>
                                <Link to={`/dashboard/matchs/edit/${match.id}`}>
                                    <button>Modifier</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <div>
                        <button
                            onClick={handlePreviousPage} disabled={currentPage === 1}
                        >
                            Précédent
                        </button>
                        <button
                            onClick={handleNextPage} disabled={currentPage === meta.last_page}
                        >
                            Suivant
                        </button>
                    </div>
                    <span>
                        Page {meta.current_page} sur {meta.last_page}
                    </span>
                </div>
            </section>
        </article>
    );
}
