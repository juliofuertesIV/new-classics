import { IArtist } from '@/interfaces/songs'
import React, { FormEvent } from 'react'

interface Props {
    selectedArtist: IArtist,
    onSubmitEditArtist: (e: FormEvent<HTMLFormElement>) => void
}

export default function EditArtistForm({ selectedArtist, onSubmitEditArtist } : Props) {
    return (
        <div className='flex-1 flex flex-col border p-4'>
            <h3 className='text-center mb-4'>{ selectedArtist.name }</h3>
            <form className='flex flex-col' onSubmit={ onSubmitEditArtist }>
                <label>
                    <p>Name:</p>
                    <input key={ selectedArtist.id } type='text' name="name" required defaultValue={ selectedArtist.name }/>
                </label>
                <label>
                    <p>About:</p>
                    <input key={ selectedArtist.id } type='text' name="about" defaultValue={ selectedArtist.about }/>
                </label>
                <input key={ selectedArtist.id } type="hidden" name='id' value={ selectedArtist.id } />
                <input type="submit" value="Edit" />
            </form>
        </div>  
    )
}
