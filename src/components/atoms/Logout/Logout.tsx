import "./Logout.scss"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";

export const Logout = () => {

    const {logout} = useAuth();

    return (
        <a href="#" about="Lien de navigation pour se déconnecter" className={`navlink`} onClick={logout}>
            Se déconnecter
        </a>
    );
};
