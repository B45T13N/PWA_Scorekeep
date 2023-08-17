import './Connexion.scss'
import {Input} from "../../components/atoms/Input/Input";
import {useEffect, useState} from "react";
function Connexion() {
    const emailErrorMessage :string = "Veuillez vérifier l'email";

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e : React.SyntheticEvent)=> {
        e.preventDefault();

        if(!regexEmail(email)) {
            setErrorMessage(emailErrorMessage)
        }
    };

    const handleChangeInput = (inputValue: string, inputType :string) => {
        switch (inputType) {
            case "email":
                !regexEmail(inputValue) ? setErrorMessage(emailErrorMessage) : setErrorMessage("");
                setEmail(inputValue);
                break;
            case "password":
                setPassword(inputValue);
                break;
            default:
                console.log("Input non pris en charge");
        }
    }

    const regexEmail = (email :string) => {
        let emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
        return emailReg.test(email);
    }


    return (
        <div className={"connexion-form"}>
            <form action="" onSubmit={handleSubmit}>
                <h3>Se connecter</h3>
                <div className="error">
                    {errorMessage}
                </div>
                <Input field={"email"}
                       type={"email"}
                       onChange={e => handleChangeInput(e.target.value, e.target.type)}/>
                <Input field={"mot de passe"}
                       type={"password"}
                       onChange={e => handleChangeInput(e.target.value, e.target.type)}/>
                <div>
                    <input type={"button"} value={"Mot de passe oublié"}/>
                    <input type={"submit"} value={"Valider"}/>
                </div>
            </form>
        </div>
    )
}

export default Connexion