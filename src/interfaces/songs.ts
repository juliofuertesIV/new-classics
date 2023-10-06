export interface ISong {
    id: string,
    name: string,
    image: {
        src: string,
        alt: string
    },
    lyrics: string,
    musicKey: string,
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