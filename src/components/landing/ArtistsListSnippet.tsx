import { IArtist } from '@/interfaces/songs'
import Image from 'next/image'
import React from 'react'

interface Props {
    artists: IArtist[]
}

export default function ArtistsListSnippet({ artists } : Props) {

    return (
        <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 place-items-center gap-4 px-4 lg:px-0">
        {
            artists.map((artist) => (
                <article key={ artist.id } className="group flex justify-end bg-zinc-900 w-full max-w-lg h-32 items-center relative border-4 border-zinc-900 cursor-pointer gradient-bg">
                    <Image 
                        className='w-full h-full max-h-full min-w-full max-w-full object-cover object-center absolute z-0 group-hover:object-top opacity-10 group-hover:opacity-70 transition-all'
                        width={ 1000 }
                        height={ 500 }
                        src={ `/img/artists/${artist.image }` }
                        alt={ artist.name }
                    />
                    <div className="flex justify-center items-center w-full h-fit p-2 mt-8 text-white">
                        <h4 className='drop-shadow-sm px-4 transition-colors'>{ artist.name }</h4>
                    </div>
                </article>
            ))
        }
        </div>
    )
}
