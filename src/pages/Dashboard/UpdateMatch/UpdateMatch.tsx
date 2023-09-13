import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Match} from "../../../interfaces/Match";
import apiClient from "../../../services/apiClient";
import "./UpdateMatch.scss"
import {Input} from "../../../components/atoms/Input/Input";
import ReactDatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";

registerLocale("fr", fr);

export default function UpdateMatch() {
    const { matchId } = useParams();
    const [matchData, setMatchData] = useState<Match | null>(null);
    const [formData, setFormData] = useState<Partial<Match>>({});
    const [address, setAddress] = useState<string>("");
    const [CPO, setCPO] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [errors, setErrors] = useState({ CPO});
    const [date, setDate] = useState(new Date());

    const navigation = useNavigate();

    useEffect(() => {
        apiClient.get(`/api/games/${matchId}`)
            .then((response) => {
                const match = response.data.data;
                setMatchData(match);
                setFormData({
                    gameDate: match.gameDate,
                    visitorTeam: match.visitorTeam,
                    category: match.category,
                    address: match.address,
                });
                let addressDatas = match.address.split("/");
                setAddress(addressDatas[0]);
                setCPO(addressDatas[1]);
                setCity(addressDatas[2]);
                setDate(new Date(match.gameDate));
            })
            .catch((error) => {
                console.error(error);
            });
    }, [matchId]);

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAddress(value);
        updateAddressDatas(value, CPO, city);
    };

    const handlePostalCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const postalCode = e.target.value;
        setCPO(postalCode);
        if (/^\d+$/.test(postalCode) && postalCode.length === 5) {
            setErrors({ ...errors, CPO: "" });
        } else {
            setErrors({ ...errors, CPO: 'Code postal invalide' });
        }
        updateAddressDatas(address, postalCode, city);
    };

    const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newCity = e.target.value;
        setCity(newCity);
        updateAddressDatas(address, CPO, newCity);
    };

    const updateAddressDatas = (newAddress: string, newCPO: string, newCity: string) => {
        setFormData({
            ...formData,
            address: newAddress + "/" + newCPO + "/" + newCity
        });
    };

    const handleDatePickerChange = (newDate: Date) => {
        setFormData({
            ...formData,
            gameDate: newDate,
        });

        setDate(newDate);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        apiClient.put(`/api/games/${matchId}`, formData)
            .then((response) => {
                console.log('Match updated successfully');
                navigation("/dashboard/matchs");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    if (!matchData) {
        return <article className={"update-match"}>Loading...</article>;
    }

    return (
        <article className={"update-match"}>
            <h2>Mise à jour du match <br/> {formData.category} contre {formData.visitorTeam?.name}</h2>
            <form onSubmit={handleSubmit}>
                <div className={"datepicker"}>
                    <label>Date du match:</label>
                    <ReactDatePicker
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
                <div>
                    <Input onChange={handleAddressChange} type={"text"} field={"Adresse"} value={address} />
                    {errors.CPO && <span className="error">{errors.CPO}</span>}
                    <Input onChange={handlePostalCodeChange} type={"text"} field={"Code postal"} value={CPO}/>
                    <Input onChange={handleCityChange} type={"text"} field={"Ville"} value={city} />
                </div>
                <button type="submit">Mettre à jour le match</button>
            </form>
        </article>
    );
}
