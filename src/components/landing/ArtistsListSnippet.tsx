import { IArtist } from '@/interfaces/songs'
import Image from 'next/image'
import React from 'react'

interface Props {
    artists: IArtist[]
}

export default function ArtistsListSnippet({ artists } : Props) {

    return (
        <div className="grid grid-cols-2 place-items-center gap-4 max-w-4xl mx-auto">
        {
            artists.map((artist) => (
                <article key={ artist.id } className="flex justify-end bg-zinc-900 w-full max-w-lg h-32 items-center relative">
                    { 
                        artist.HostedImage &&
                        <Image 
                            className='w-full h-full max-h-full min-w-full max-w-full object-cover object-top absolute z-0 hover:object-center hover:opacity-100 opacity-50 transition-all'
                            width={ artist.HostedImage.width }
                            height={ artist.HostedImage.height }
                            src={ `/img/artists/${artist.HostedImage.src}` }
                            alt={ artist.HostedImage.alt }
                        />
                    }
                    <div className="flex items-center w-fit h-fit p-2 mr-4 text-black bg-white absolute">
                        <h3>{ artist.name }</h3>
                    </div>
                </article>
            ))
        }
        </div>
    )
}
