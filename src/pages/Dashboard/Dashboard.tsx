import './Dashboard.scss'
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {DashboardLink} from "../../components/molecules/DashboardLink/DashboardLink";

interface DashboardLinks {
    innerText: string,
    link: string
}

function Dashboard() {
    const dashboardLinks :Array<DashboardLinks> = [
        {innerText: "Gestion des matchs",link: "/dashboard/matchs"},
    ];

    return (
        <section className="dashboard">
            <h1>Panneau d'administration</h1>
            <div className="dashboard-links">
                {dashboardLinks.map((obj, key) =>
                    <DashboardLink key={key} link={obj.link} innerText={obj.innerText}/>
                )}
            </div>
        </section>
    )
}

export default Dashboard