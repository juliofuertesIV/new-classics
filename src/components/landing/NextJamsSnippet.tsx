import { IJam } from '@/interfaces/jam'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
  jams: IJam[]
}

export default function NextJamsSnippet({ jams } : Props) {
    return (
      <div className="w-full mb-12">
        <header className="py-8 text-center">
            <h3>Próximas Jams</h3>
        </header>
        <div className="px-4 w-full md:grid md:grid-cols-2 lg:grid-cols-3 flex flex-col gap-4 items-center">
        {
            jams.map((jam) => {
                return (
                    <article key={jam.id} className="text-center border-2 w-full h-32 bg-gradient-to-r from-purple-500 to-pink-500 overflow-hidden">
                        <h4 className="uppercase w-full p-2 bg-zinc-800">{ new Date(jam.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}</h4>
                        <Image
                            src={ '/img/artists/elvis.jpg'} 
                            alt="img" 
                            width={ 500 }
                            height={ 500 } 
                            className="object-cover w-full h-full max-w-full max-h-full opacity-30" 
                        />
                        <div className='flex flex-col'>
                            { 
                                jam.Guests ? 
                                    <p>Banda invitada: { jam.Guests[0]?.name }</p> :
                                    <p>Sin banda invitada: <Link href={ '/' }>Escríbenos</Link></p> 
                            }
                        </div>
                    </article>
                )
            })
        }
        </div>
  </div>
    )
}
