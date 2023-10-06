import { IArtist } from '@/interfaces/songs'
import React from 'react'

export default function EditForm({ selectedArtist } : { selectedArtist: IArtist | null }) {
    return (
        <div className='flex-1 flex flex-col border p-4'>
            <h3 className='text-center'>{ selectedArtist ? selectedArtist.name : 'Selecciona un artista' }</h3>
        </div>  
    )
}
