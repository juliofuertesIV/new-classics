import { IGuestArtist } from "@/interfaces/guests"

interface Props {
    guests: IGuestArtist[] | undefined,
    selectedGuest: IGuestArtist | null,
    onSelectGuest: (jam: IGuestArtist) => void 
}

export default function GuestList({ guests, selectedGuest, onSelectGuest } : Props) {

    const manageArtistClick = (jam: IGuestArtist) => onSelectGuest(jam)

    if (!guests) return '...'

    return (
        <div className='flex-1 flex flex-col border'>
        {
            guests.map((guest) => {
                return (
                    <div 
                        key={guest.id}
                        data-selected={ selectedGuest?.id === guest.id }
                        className='odd:bg-zinc-800 py-1 flex justify-between items-center px-2 cursor-pointer hover:text-black hover:bg-white data-[selected="true"]:pointer-events-none data-[selected="true"]:bg-white data-[selected="true"]:text-black'
                        onClick={ () => manageArtistClick(guest) }
                    >
                        <p>{ guest.name }</p>
                    </div>
                )
            })
        }
        </div>
    )
}
