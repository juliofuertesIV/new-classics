export interface ISong {
    id: string,
    name: string,
    image: {
        src: string,
        alt: string
    },
    lyrics: string,
    musicKey: MusicKey,
    mode: MusicMode,
    spotifyLink: string,
    ArtistId: string,
    Artist?: IArtist
}

export interface IArtist {
    id: string,
    name: string,
    about: string,
    image: {
        src: string,
        alt: string
    }
}

export type MusicKey = 'A♭' | 'A' | 'A♯' | 'B♭' | 'B' | 'C' | 'C♯' | 'D♭' | 'D' | 'D♯' | 'E♭' | 'E' | 'F' | 'F♯' | 'G♭' | 'G'
export type MusicMode = 'minor' | 'major'