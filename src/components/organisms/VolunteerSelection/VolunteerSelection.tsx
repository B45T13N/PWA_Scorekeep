import "./VolunteerSelection.scss"
import RadioInput from "../../atoms/RadioInput/RadioInput";
import React, {useState} from "react";
import moment from "moment";
import {Secretary} from "../../../interfaces/Secretary";
import {Timekeeper} from "../../../interfaces/Timekeeper";
import {RoomManager} from "../../../interfaces/RoomManager";
import apiClient from "../../../services/apiClient";

interface VolunteerSelectionProps {
    matchId: number,
    matchCategory: string,
    visitorTeamName: string,
    matchDate: Date,
    isHomeMatch: boolean,
    timekeepers: Array<Timekeeper>,
    roomManagers: Array<RoomManager>,
    secretaries: Array<Secretary>,
    timekeeperId?: number,
    secretaryId?: number,
    roomManagerId?: number,
}

export default function VolunteerSelection(props: VolunteerSelectionProps) {

    const [selectedTimekeeper, setSelectedTimekeeper] =
        useState(props.timekeeperId ? `timekeepers ${props.timekeeperId} ${props.matchId}` : "");
    const [selectedSecretary, setSelectedSecretary] =
        useState(props.secretaryId ? `secretaries ${props.secretaryId} ${props.matchId}` : "");
    const [selectedRoomManager, setSelectedRoomManager] =
        useState(props.roomManagerId ? `roomManagers ${props.roomManagerId} ${props.matchId}` : "");

    const handleRadioSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        let id = e.target.id;
        switch (e.target.name) {
            case "secretaries":
                setSelectedSecretary(id);
                break;
            case "roomManagers":
                setSelectedRoomManager(id);
                break;
            case "timekeepers":
                setSelectedTimekeeper(id);
                break;
        }
    };

    const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        let timekeeperId = selectedTimekeeper.split(" ")[1];
        let secretaryId = selectedSecretary.split(" ")[1];
        let roomManagerId = selectedRoomManager.split(" ")[1];
        let matchId = e.currentTarget.id;

        apiClient.put(`/api/games/addVolunteers/${matchId}`, {
            'timekeeperId': timekeeperId,
            'secretaryId': secretaryId,
            'roomManagerId': roomManagerId,
        }).then((response) => {
            if(response.status === 200){
                console.log('Match updated successfully');
            }
        })
            .catch((error) => {
                console.error(error);
            });
    }
    if(!props.isHomeMatch){
        return (
            <tr className={"hidden-xs"}>
                <td>
                    <div>
                        <p>{props.visitorTeamName}</p>
                        <p>{props.matchCategory}</p>
                        <p>{moment(props.matchDate).format('DD/MM/YYYY HH:mm')}</p>
                    </div>
                </td>
                <td colSpan={3}>Match à l'extérieur</td>
                <td></td>
            </tr>
        )
    }

    return (
        <tr>
            <td>
                <div>
                    <p>{props.visitorTeamName}</p>
                    <p>{props.matchCategory}</p>
                    <p className={"hidden-xs"}>{moment(props.matchDate).format('DD/MM/YYYY HH:mm')}</p>
                </div>
            </td>
            <td>
                <div className={"volunteers-grid-display"}>
                    {props.timekeepers.map((timekeeper: Timekeeper) => (
                        <RadioInput
                            key={timekeeper.id}
                            id={`timekeepers ${timekeeper.id.toString()} ${props.matchId}`}
                            name={"timekeepers"}
                            text={timekeeper.name}
                            isSelected={selectedTimekeeper === `timekeepers ${timekeeper.id.toString()} ${props.matchId}`}
                            onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {handleRadioSelect(e)}}
                        />
                    ))}
                </div>
            </td>
            <td>
                <div className={"volunteers-grid-display"}>
                    {props.secretaries.map((secretary: Secretary) => (
                        <RadioInput
                            key={secretary.id}
                            id={`secretaries ${secretary.id.toString()} ${props.matchId}`}
                            name={"secretaries"}
                            text={secretary.name}
                            isSelected={selectedSecretary === `secretaries ${secretary.id.toString()} ${props.matchId}`}
                            onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {handleRadioSelect(e)}}
                        />
                    ))}
                </div>
            </td>
            <td>
                <div className={"volunteers-grid-display"}>
                    {props.roomManagers.map((roomManager: RoomManager) => (
                        <RadioInput
                            key={roomManager.id}
                            id={`roomManagers ${roomManager.id.toString()} ${props.matchId}`}
                            name={"roomManagers"}
                            text={roomManager.name}
                            isSelected={selectedRoomManager === `roomManagers ${roomManager.id.toString()} ${props.matchId}`}
                            onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {handleRadioSelect(e)}}
                        />
                    ))}
                </div>
            </td>
            <td>
                <button id={props.matchId.toString()} onClick={(e) => handleClickButton(e)}>
                    Mettre à jour
                </button>
            </td>
        </tr>
    )
}