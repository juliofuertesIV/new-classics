import { ISong } from "@/interfaces/songs"

interface Props {
    songs: ISong[],
    selectedSong: ISong | null,
    onSelectSong: (song: ISong) => void 
}

export default function SongList({ songs, selectedSong, onSelectSong } : Props) {

    const manageArtistClick = (song: ISong) => onSelectSong(song)

    if (!songs) return '...'

    return (
        <div className='flex-1 flex flex-col p-4'>
        {
            songs.map((song) => {
                return (
                    <div 
                        key={song.id}
                        data-selected={ selectedSong?.id === song.id }
                        className='even:bg-zinc-800 py-1 flex items-center px-2 cursor-pointer hover:text-black hover:bg-white data-[selected="true"]:pointer-events-none data-[selected="true"]:bg-white data-[selected="true"]:text-black'
                        onClick={ () => manageArtistClick(song) }
                    >
                        { song.name }
                    </div>
                )
            })
        }
        </div>
    )
}
