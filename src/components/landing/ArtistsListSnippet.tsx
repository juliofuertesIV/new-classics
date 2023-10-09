import { IArtist } from '@/interfaces/songs'
import Image from 'next/image'
import React from 'react'

interface Props {
    artists: IArtist[]
}

export default function ArtistsListSnippet({ artists } : Props) {

    return (
        <div className="w-full grid lg:grid-cols-2 place-items-center gap-4">
        {
            artists.map((artist) => (
                <article key={ artist.id } className="group flex justify-end bg-zinc-900 w-full max-w-lg h-32 items-center relative border-4 border-black cursor-pointer">
                    <Image 
                        className='w-full h-full max-h-full min-w-full max-w-full object-cover object-center absolute z-0 group-hover:object-top opacity-30 group-hover:opacity-80 transition-all'
                        width={ 452 }
                        height={ 120 }
                        src={ `/img/artists/${artist.image }` }
                        alt={ artist.name }
                    />
                    <div className="flex items-center w-fit h-fit p-2 mr-4 text-white absolute">
                        <h3 className='drop-shadow-md'>{ artist.name }</h3>
                    </div>
                </article>
            ))
        }
        </div>
    )
}
