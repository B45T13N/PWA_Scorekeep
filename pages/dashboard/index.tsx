import './dashboard.scss'
import {DashboardLink} from "@/components/molecules/DashboardLink/DashboardLink";
import {NextPage} from "next";
import {useAuthRedirect} from "@/hooks/useAuthRedirect/useAuthRedirect";

interface DashboardLinks {
    innerText: string,
    link: string
}

const Dashboard: NextPage = () => {
    const teamDashboardLinks :Array<DashboardLinks> = [
        {innerText: "Gestion des matchs",link: "/dashboard/matchs"},
        {innerText: "Gestion des bénévoles",link: "/dashboard/volunteers"},
    ];

    const userDashboardLinks :Array<DashboardLinks> = [
        {innerText: "Changement de mot de passe",link: "/update/password"},
    ];

    return (
        <article className={"dashboard"}>
            <section className="team-dashboard">
                <div>
                    <h2>Panneau d'administration</h2>
                </div>
                <div className="dashboard-links">
                    {teamDashboardLinks.map((obj, key) =>
                        <DashboardLink key={key} link={obj.link} innerText={obj.innerText}/>
                    )}
                </div>
            </section>

            <section className="user-dashboard">
                <div>
                    <h2>Vos données</h2>
                </div>
                <div className="dashboard-links">
                    {userDashboardLinks.map((obj, key) =>
                        <DashboardLink key={key} link={obj.link} innerText={obj.innerText}/>
                    )}
                </div>
            </section>
        </article>
    )
}
export const getServerSideProps = useAuthRedirect;

export default Dashboard;