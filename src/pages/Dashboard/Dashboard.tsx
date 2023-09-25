import './Dashboard.scss'
import {DashboardLink} from "../../components/molecules/DashboardLink/DashboardLink";

interface DashboardLinks {
    innerText: string,
    link: string
}

function Dashboard() {
    const dashboardLinks :Array<DashboardLinks> = [
        {innerText: "Gestion des matchs",link: "/dashboard/matchs"},
        {innerText: "Gestion des bénévoles",link: "/dashboard/volunteers"},
    ];

    return (
        <section className="dashboard">
            <h2>Panneau d'administration</h2>
            <div className="dashboard-links">
                {dashboardLinks.map((obj, key) =>
                    <DashboardLink key={key} link={obj.link} innerText={obj.innerText}/>
                )}
            </div>
        </section>
    )
}

export default Dashboard