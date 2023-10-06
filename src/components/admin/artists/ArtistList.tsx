import { IArtist } from "@/interfaces/songs"

interface Props {
    artists: IArtist[],
    selectedArtist: IArtist | null,
    onSelectArtist: (artist: IArtist) => void 
}

export default function ArtistList({ artists, selectedArtist, onSelectArtist } : Props) {

    const manageArtistClick = (artist: IArtist) => {
        onSelectArtist(artist)
    }

    if (!artists) return '...'

    return (
        <div className='flex-1 flex flex-col p-4'>
        {
            artists.map((artist) => {
                return (
                    <div 
                        key={artist.id}
                        data-selected={ selectedArtist?.id === artist.id }
                        className='even:bg-zinc-800 py-1 flex items-center px-2 cursor-pointer hover:text-black hover:bg-white data-[selected="true"]:pointer-events-none data-[selected="true"]:bg-white data-[selected="true"]:text-black'
                        onClick={ () => manageArtistClick(artist) }
                    >
                        { artist.name }
                    </div>
                )
            })
        }
        </div>
    )
}
