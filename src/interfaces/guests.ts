import { IJam } from "./jam"

export interface IGuestArtist {
    id: string,
    name: string,
    instagram?: string,
    spotify?: string,
    image?: {
        src: string,
        alt: string
    },
    Jams: IJam[]
}

export interface IGuestRequest {
    id: string,
    email: string,
    phone: string,
    name: string,
    instagram?: string,
    jamsRequested: IJam[]
}
