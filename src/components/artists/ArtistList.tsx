import { IArtist } from "@/interfaces/songs"

export default function ArtistList({ artists } : { artists: IArtist[] }) {
    return (
        <div className='flex-1 flex flex-col p-4'>
        {
            artists.map((artist) => {
                return (
                    <div 
                        key={artist.id}
                        className='even:bg-zinc-800 py-1 flex items-center px-2 cursor-pointer hover:text-black hover:bg-white'
                    >
                        { artist.name }
                    </div>
                )
            })
        }
        </div>
    )
}
