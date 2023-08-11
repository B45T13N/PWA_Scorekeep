import Header from "../../organisms/Header/Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <div className="page">
            <Header/>
            <Outlet />
        </div>
    )
}