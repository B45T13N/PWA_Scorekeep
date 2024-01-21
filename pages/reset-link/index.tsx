import './reset-link.scss'
import {useState, FormEvent, useEffect} from 'react';
import {Input} from "@/components/atoms/Input/Input";
import {Button} from "@/components/atoms/Button/Button";
import apiClient from "@/services/apiClient";
import {useRouter} from "next/router";

const ResetPasswordPage: React.FC = () => {
    const passwordErrorMessage :string = "Les mots de passes ne sont pas identiques.";
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    useEffect(() => {
        const queryToken = router.query.token;
        const queryEmail = router.query.email;

        if (typeof queryToken === 'string' && typeof queryEmail === 'string') {
            setToken(queryToken);
            setEmail(queryEmail);
        }
    }, [router]);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if(password !== confirmedPassword){
            setErrorMessage(passwordErrorMessage);

            return;
        } else {
            setErrorMessage('');
        }

        await apiClient.post('/api/password/reset', {
            'email': email,
            'token': token,
            'password': password,
            'password_confirmation': confirmedPassword
        }).then(
            (response) => {
                if(response.status == 200) {
                    setTimeout(() => {
                        router.push("/login");
                    }, 1500);
                }
            }
        ).catch((error) => {
            setErrorMessage(error.response.data.message);
        });
    };

    const handleChangeInput = (inputValue: string, inputType :string) => {
        setTimeout(() => {
            switch (inputType) {
                case "password":
                    setPassword(inputValue);
                    break;
                case "confirmedPassword":
                    setConfirmedPassword(inputValue);
                    break;
                default:
                    console.log("Input non pris en charge");
            }
        }, 0);
    }

    return (
        <div className={"reset-link-form"}>
            <form onSubmit={handleSubmit}>
                <h3>Réinitialisation du mot de passe</h3>
                <div className="error">
                    {errorMessage}
                </div>
                <Input type={'password'}
                       onChange={(e) => handleChangeInput(e.target.value, e.target.type)}
                       field={"mot de passe"}
                />
                <Input type={'password'}
                       onChange={(e) => handleChangeInput(e.target.value, 'confirmedPassword')}
                       field={"confirmation de mot de passe"}
                />
                <Button text={"Réinitialiser le mot de passe"} type="submit" />
            </form>
        </div>
    );
};

export default ResetPasswordPage;
