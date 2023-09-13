import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Match} from "../../../interfaces/Match";
import apiClient from "../../../services/apiClient";
import "./AddMatch.scss"
import {Input} from "../../../components/atoms/Input/Input";
import ReactDatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
import {Switch} from "../../../components/atoms/Switch/Switch";

registerLocale("fr", fr);

export default function AddMatch() {
    const [matchData, setMatchData] = useState<Match | null>(null);
    const [formData, setFormData] = useState<Partial<Match>>({});
    const [visitorTeamName, setVisitorTeamName] = useState<string>("");
    const [isHomeMatch, setIsHomeMatch] = useState<boolean>(true);
    const [category, setCategory] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [CPO, setCPO] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [errors, setErrors] = useState({ CPO});
    const [date, setDate] = useState(new Date());

    const localTeamId = sessionStorage.getItem("localTeamId");

    const navigation = useNavigate();

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
    };

    const handlePostalCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const postalCode = e.target.value;
        if (/^\d+$/.test(postalCode) && postalCode.length === 5) {
            setErrors({ ...errors, CPO: "" });
        } else {
            setErrors({ ...errors, CPO: 'Code postal invalide' });
        }
    };

    const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
    };

    const updateAddressDatas = (newAddress: string, newCPO: string, newCity: string) => {
    };

    const handleDatePickerChange = (newDate: Date) => {

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        apiClient.post(`/api/games/store`, formData)
            .then((response) => {
                if(response.status === 200){
                    console.log('Match updated successfully');
                    navigation("/dashboard/matchs");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <article className={"update-match"}>
            <h2>Ajout d'un match</h2>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Détails du match : </legend>
                    <Switch
                        colorOne={"#17CFE3"}
                        colorTwo={"#CCBCAD"}
                        isOn={isHomeMatch}
                        handleToggle={() => setIsHomeMatch(!isHomeMatch)}
                        textOne={"A domicile"}
                        textTwo={"A l'extérieur"}
                    />
                    <div className={"datepicker"}>
                        <label htmlFor={"gameDate"}>Date du match:</label>
                        <ReactDatePicker
                            ariaLabelledBy={"gameDate"}
                            name={"gameDate"}
                            showTimeSelect
                            minTime={new Date(0, 0, 0, 8, 30)}
                            maxTime={new Date(0, 0, 0, 22, 0)}
                            selected={date}
                            onChange={handleDatePickerChange}
                            dateFormat="d MMMM yyyy à HH:mm"
                            locale={"fr"}
                            timeFormat="HH:mm"
                        />
                    </div>
                    <Input onChange={handleAddressChange} type={"text"} field={"Equipe adverse"} value={visitorTeamName} />
                    <Input onChange={handleAddressChange} type={"text"} field={"Catégorie"} value={category} />
                </fieldset>
                <fieldset>
                    <legend>Adresse du gymnase : </legend>
                    <Input onChange={handleAddressChange} type={"text"} field={"Adresse"} value={address} />
                    {errors.CPO && <span className="error">{errors.CPO}</span>}
                    <Input onChange={handlePostalCodeChange} type={"text"} field={"Code postal"} value={CPO}/>
                    <Input onChange={handleCityChange} type={"text"} field={"Ville"} value={city} />
                </fieldset>
                <button type="submit">Mettre à jour le match</button>
            </form>
        </article>
    );
}
