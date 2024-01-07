import './reste-password.scss'
import { useState, FormEvent } from 'react';
import {Input} from "@/components/atoms/Input/Input";
import {Button} from "@/components/atoms/Button/Button";

const ResetPasswordPage: React.FC = () => {
    const emailErrorMessage :string = "Veuillez vérifier l'email.";
    const emailSendingMessage :string = "Un e-mail vous a été envoyé.";
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [sendingMessage, setSendingMessage] = useState<string>('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();



        setSendingMessage(emailSendingMessage);
    };

    const handleChangeInput = (inputValue: string, inputType :string) => {
        setTimeout(() => {
            switch (inputType) {
                case "email":
                    !regexEmail(inputValue) ? setErrorMessage(emailErrorMessage) : setErrorMessage("");
                    setEmail(inputValue);
                    break;
                default:
                    console.log("Input non pris en charge");
            }
        }, 3000);
    }

    const regexEmail = (email :string) => {
        let emailReg = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
        return emailReg.test(email);
    }

    return (
        <div className={"reset-password-form"}>
            <form onSubmit={handleSubmit}>
                <h3>Réinitialisation du mot de passe</h3>
                <div className={"envoi"}>
                    {sendingMessage}
                </div>
                <div className="error">
                    {errorMessage}
                </div>
                <Input type={'email'}
                       onChange={(e) => handleChangeInput(e.target.value, e.target.type)}
                       field={"Email"}
                />
                <Button text={"Réinitialiser le mot de passe"} type="submit" />
            </form>
        </div>
    );
};

export default ResetPasswordPage;
