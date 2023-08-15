import './Connexion.scss'
import {Input} from "../../components/atoms/Input/Input";
import {useEffect, useState} from "react";
function Connexion() {
    const emailErrorMessage = "Veuillez vérifier l'email";

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleSubmit = (e : React.SyntheticEvent)=> {
        e.preventDefault();

        let target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };

        let email = target.email;
        let password = target.password;

        if(!regexEmail(email.value)) {
            setErrorMessage(emailErrorMessage)
        }

        console.log(password.value)
    };

    useEffect(() => {
        !regexEmail(email) ? setErrorMessage(emailErrorMessage) : setErrorMessage("")
    }, [email])

    const regexEmail = (email :string) => {
        let emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
        return emailReg.test(email);
    }


    return (
        <div className={"connexion-form"}>
            <form action="" onSubmit={handleSubmit}>
                {errorMessage && <div className="error"> {errorMessage} </div>}
                <Input field={"email"}
                       type={"email"}
                       onChange={e => setEmail(e.target.value)}/>
                <Input field={"mot de passe"}
                       type={"password"}/>
                <div>
                    <input type={"button"} value={"Mot de passe oublié"}/>
                    <input type={"submit"} value={"Valider"}/>
                </div>
            </form>
        </div>
    )
}

export default Connexion