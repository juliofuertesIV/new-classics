import { IJam } from '@/interfaces/jam'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  jams: IJam[]
}

export default function NextJamsSnippet({ jams } : Props) {

    return (
        <div className="px-4 w-full md:grid md:grid-cols-2 lg:grid-cols-3 flex flex-col gap-4 items-center">
        {
            jams.map((jam) => {
                return (
                    <article key={jam.id} className="text-center border-2 w-full aspect-square overflow-hidden gradient-bg relative">
                        <h4 className="uppercase w-full p-2 bg-zinc-900">{ new Date(jam.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}</h4>
                        <Image
                            src={ '/img/guests/lazychai.webp'} 
                            alt="img" 
                            width={ 500 }
                            height={ 500 } 
                            className="object-cover saturate-0 w-full h-full max-w-full max-h-full opacity-30 absolute z-10" 
                        />
                        <div className='flex flex-col h-full w-full justify-center absolute z-20'>
                            { 
                                jam.Guests ? 
                                    <h3>Banda invitada: { jam.Guests[0]?.name }</h3> :
                                    <p>Sin banda invitada: <Link href={ '/' }>Escríbenos</Link></p> 
                            }
                        </div>
                    </article>
                )
            })
        }
        </div>
    )
}
