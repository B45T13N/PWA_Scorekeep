import "./RegistrationVolunteerModal.scss"
import {ReactComponent} from "../../../assets/images/x.svg";
import React, {ChangeEvent, useState} from "react";
import apiClient from "../../../services/apiClient";
import {Input} from "../../atoms/Input/Input";
import moment from "moment";
import Select from "../../atoms/Select/Select";

interface RegistrationVolunteerModalProps {
    isOpen: boolean;
    toggle: () => void;
    gameDate: Date,
    visitorTeamName: string,
    gameCategory: string,
    gameId: string
}

export default function RegistrationVolunteerModal(props: RegistrationVolunteerModalProps) {

    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [APIUri, setAPIUri] = useState<string>("")
    const [error, setError] = useState<string>("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        apiClient.post(`${APIUri}`,
            {
                "name": name,
                "gameId": props.gameId,
                "token": password
            }
            )
            .then((response) => {
                if(response.status === 201){
                    console.log('Registration done');
                }
            })
            .catch((error) => {
                console.error(error);
                setError("Erreur lors de l'enregistrement.");
            });
    };

    const handleVisitorNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.value) {
            case "room-manager":
                setAPIUri("/api/room-managers/store");
                break;
            case "secretary":
                setAPIUri("/api/secretaries/store");
                break;
            case "timekeeper":
                setAPIUri("/api/timekeepers/store");
                break;
        }
    };

    const handleClose = () => {
        props.toggle()
        setError("");
    }



    return (
        <>
            {props.isOpen && (
                <div className={"dark-bg"} onClick={handleClose}>
                    <div className={"centered"}>
                        <div className={"modal"} onClick={(e) => e.stopPropagation()}>
                            <div className={"modal-header"}>
                                <h5 className={"heading"}>{props.gameCategory} contre {props.visitorTeamName}</h5>
                                <p>{moment(props.gameDate).format('DD/MM/YYYY HH:mm')}</p>
                            </div>
                            <div className={"close-btn"} onClick={handleClose}>
                                <ReactComponent />
                            </div>
                            <div className={"error"}>
                                {error && (
                                    <div className={"modal-content"}>
                                        <h5>{error}</h5>
                                    </div>
                                )}
                                <form className={"form-submit"} onSubmit={handleSubmit}>
                                    <Select onChange={handleSelectChange}/>
                                    <Input type={"text"} maxLength={30} field={"nom"} onChange={handleVisitorNameChange} />
                                    <Input type={"password"} maxLength={30} field={"mot de passe"} onChange={handlePasswordChange} />
                                </form>
                            </div>
                            <div className={"modal-actions"}>
                                <div className={"actions-container"}>
                                    <button className={"confirm-btn"} onClick={handleSubmit}>
                                        S'enregistrer
                                    </button>
                                    <button
                                        className={"cancel-btn"}
                                        onClick={handleClose}
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}