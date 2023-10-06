export interface ISong {
    id: string,
    image: {
        src: string,
        alt: string
    },
    lyrics: string,
    musicKey: string,
    spotifyLink: string,
    ArtistId: string,
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