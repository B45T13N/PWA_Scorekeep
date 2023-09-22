import {Timekeeper} from "./Timekeeper";
import {Secretary} from "./Secretary";
import {RoomManager} from "./RoomManager";
import {LocalTeam} from "./LocalTeam";
import {VisitorTeam} from "./VisitorTeam";

export interface Match {
    id: number,
    address: string,
    category: string,
    gameDate: Date,
    isHomeMatch: boolean,
    isCancelled: boolean,
    timekeeper?: Timekeeper,
    secretary?: Secretary,
    roomManager?: RoomManager,
    localTeam: LocalTeam,
    visitorTeam: VisitorTeam,
    visitorTeamName?: string,
    localTeamId?: number
}