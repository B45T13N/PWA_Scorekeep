import './Connexion.scss'
import {Button} from "../../components/atoms/Button/Button";
function Connexion() {
    return (
        <div className={"connexion-form"}>
            <form action="">
                <div>
                    <label htmlFor="email">Votre email</label>
                    <input type="text" id={"email"} />
                </div>
                <div>
                    <label htmlFor="password">Votre mot de passe</label>
                    <input type="password" id={"password"} />
                </div>
                <div className={"buttons"}>
                    <Button text={"Mot de passe oublié"} type={undefined}/>
                    <Button text={"Valider"} type={"submit"}/>
                </div>
            </form>
        </div>
    )
}

export default Connexion