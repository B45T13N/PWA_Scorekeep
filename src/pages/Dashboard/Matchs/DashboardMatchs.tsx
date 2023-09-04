import './DashboardMatchs.scss'
import {Link} from "react-router-dom";

export default function DashboardMatchs() {
    const matches = [
        { id: 1, name: 'Match 1' },
        { id: 2, name: 'Match 2' },
        // Add more matches as needed
    ];

    return (
        <article className={"dashboard-matchs"}>
            <h1>Matchs Dashboard</h1>

            <section className="content">
                <div className={"add-match-button"}>
                    <Link to={"/match/add"}>
                        <button>
                            Add Match
                        </button>
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
                    {matches.map((match) => (
                        <tr key={match.id}>
                            <td>{match.id}</td>
                            <td>{match.name}</td>
                            <td>{match.name}</td>
                            <td>
                                <Link to={`/match/edit/${match.id}`}>
                                    <button>
                                        Edit
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </article>
    )
}

