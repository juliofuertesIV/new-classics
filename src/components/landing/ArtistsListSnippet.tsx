import { IArtist } from '@/interfaces/songs'
import Image from 'next/image'
import React from 'react'

interface Props {
    artists: IArtist[]
}

export default function ArtistsListSnippet({ artists } : Props) {

    return (
        <div className="w-full grid md:grid-cols-2 place-items-center gap-4 px-4 lg:px-0">
        {
            artists.map((artist) => (
                <article key={ artist.id } className="group flex justify-end bg-zinc-900 w-full max-w-lg h-32 items-center relative border-4 border-black cursor-pointer bg-gradient-to-r from-violet-400 to-fuchsia-400">
                    <Image 
                        className='w-full h-full max-h-full min-w-full max-w-full object-cover object-center absolute z-0 group-hover:object-top opacity-10 group-hover:opacity-70 transition-all'
                        width={ 1000 }
                        height={ 500 }
                        src={ `/img/artists/${artist.image }` }
                        alt={ artist.name }
                    />
                    <div className="flex items-center w-fit h-fit p-2 mr-4 text-white absolute">
                        <h3 className='drop-shadow-md group-hover:bg-zinc-900 transition-colors'>{ artist.name }</h3>
                    </div>
                </article>
            ))
        }
        </div>
    )
}
