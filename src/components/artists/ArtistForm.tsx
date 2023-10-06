import { IArtist } from '@/interfaces/songs'
import React from 'react'

export default function ArtistForm({ selectedArtist } : { selectedArtist: IArtist | null }) {

    if (!selectedArtist) return (
        <div className='flex-1 flex flex-col border p-4'>
            <h3 className='text-center mb-4'>Add artist</h3>
            <form className='flex flex-col'>
                <label className='flex flex-col'>
                    <p>Name:</p>
                    <input type='text' className='px-2 py-1 text-black' name="name" required />
                </label>
                <label className='flex flex-col'>
                    <p>About:</p>
                    <input type='text' className='px-2 py-1 text-black' name="about" />
                </label>
            </form>
        </div>
    )

    return (
        <div className='flex-1 flex flex-col border p-4'>
            <h3 className='text-center mb-4'>{ selectedArtist.name }</h3>
            <form className='flex flex-col'>
                <label className='flex flex-col'>
                    <p>Name:</p>
                    <input type='text' className='px-2 py-1 text-black' name="name" required defaultValue={ selectedArtist.name }/>
                </label>
                <label className='flex flex-col'>
                    <p>About:</p>
                    <input type='text' className='px-2 py-1 text-black' name="about" defaultValue={ selectedArtist.about || '' }/>
                </label>
            </form>
        </div>  
    )
}
