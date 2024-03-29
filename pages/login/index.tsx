import './login.scss'
import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/useAuth/useAuth";
import {Input} from '@/components/atoms/Input/Input';
import {Button} from "@/components/atoms/Button/Button";
import {useRouter} from "next/router";
import Link from "next/link";

export default function Connexion() {
    const emailErrorMessage :string = "Veuillez vérifier l'email";
    const connexionErrorMessage :string = "Email ou mot de passe incorrect";
    const dashboardURI = "/dashboard";
    
    const router = useRouter();

    const { login, isAuthenticated} = useAuth();

    useEffect(() => {
        if(isAuthenticated){
            router.push(dashboardURI);
        }
    }, [router, isAuthenticated]);

    const [errorMessage, setErrorMessage] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e : React.SyntheticEvent)=> {
        e.preventDefault();

        if(!regexEmail(email)) {
            setErrorMessage(emailErrorMessage)
        }

        let loggedIn = await login(email, password);

        if(loggedIn){
            router.push(dashboardURI);
        } else {
            setErrorMessage(connexionErrorMessage);
        }
    };

    const handleChangeInput = (inputValue: string, inputType :string) => {
        setTimeout(() => {
            switch (inputType) {
                case "email":
                    !regexEmail(inputValue) ? setErrorMessage(emailErrorMessage) : setErrorMessage("");
                    setEmail(inputValue);
                    break;
                case "password":
                case "text":
                    setPassword(inputValue);
                    break;
                default:
                    console.log("Input non pris en charge");
            }
        }, 0)
    }

    const regexEmail = (email :string) => {
        let emailReg = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
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
                <div className={"buttons"}>
                    <Link href={"/reset-password"}>Mot de passe oublié</Link>
                    <Button text={"Valider"} type={"submit"}/>
                </div>
            </form>
        </div>
    )
}
