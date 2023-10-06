import { IGuestArtist } from "./guests"

export interface IJam {
    id: string,
    date: Date,
    weekDay: number,
    openDoorsTime: string,
    startJamTime: string,
    hasGuest: boolean,
    Guests?: IGuestArtist[]
}