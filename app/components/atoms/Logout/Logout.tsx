import "./Logout.scss"
import {useAuth} from "@/app/hooks/useAuth/useAuth";

export const Logout = () => {

    const {logout} = useAuth();

    return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a href="#" about="Lien de navigation pour se déconnecter" className={`navlink`} onClick={logout}>
            Se déconnecter
        </a>
    );
};
