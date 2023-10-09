import { IJam } from "@/interfaces/jam"

interface Props {
    jams: IJam[] | undefined,
    selectedJam: IJam | null,
    onSelectJam: (jam: IJam) => void 
}

export default function JamList({ jams, selectedJam, onSelectJam } : Props) {

    const manageArtistClick = (jam: IJam) => onSelectJam(jam)

    if (!jams) return '...'

    return (
        <div className='flex-1 flex flex-col border'>
        {
            jams.map((jam) => {
                return (
                    <div 
                        key={jam.id}
                        data-selected={ selectedJam?.id === jam.id }
                        className='odd:bg-zinc-800 py-1 flex justify-between items-center px-2 cursor-pointer hover:text-black hover:bg-white data-[selected="true"]:pointer-events-none data-[selected="true"]:bg-white data-[selected="true"]:text-black'
                        onClick={ () => manageArtistClick(jam) }
                    >
                        <p>{ new Date(jam.date).toLocaleString('es-ES', { day: '2-digit', month: 'short', year: '2-digit' }) }</p>
                    </div>
                )
            })
        }
        </div>
    )
}
