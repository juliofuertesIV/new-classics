export interface ISong {
    id: string,
    name: string,
    lyrics: string,
    musicKey: MusicKey,
    musicMode: MusicMode,
    spotifyLink: string,
    ArtistId: string,
    Artist?: IArtist
}

export interface IArtist {
    id: string,
    name: string,
    about: string,
    HostedImage: {
        src: string,
        alt: string,
        width: number,
        height: number
    }
}

export type MusicKey = 'A♭' | 'A' | 'A♯' | 'B♭' | 'B' | 'C' | 'C♯' | 'D♭' | 'D' | 'D♯' | 'E♭' | 'E' | 'F' | 'F♯' | 'G♭' | 'G'
export type MusicMode = 'minor' | 'major'