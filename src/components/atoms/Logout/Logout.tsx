import "./Logout.scss"
import {useAuth} from "../../../hooks/useAuth";

export const Logout = () => {

    const {logout} = useAuth();

    return (
        <a href="#" about="Lien de navigation pour se déconnecter" className={`navlink`} onClick={logout}>
            Se déconnecter
        </a>
    );
};
