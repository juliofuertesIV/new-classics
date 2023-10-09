import { IGuestArtist } from '@/interfaces/guests'
import React, { FormEvent } from 'react'

interface Props {
    selectedGuest: IGuestArtist,
    onSubmitEditGuestForm: (e: FormEvent<HTMLFormElement>) => void
}

export default function EditGuestForm({ selectedGuest, onSubmitEditGuestForm } : Props) {
    return (
        <div className='flex-1 flex flex-col border p-4'>
            <h3 className='text-center mb-4'>{ selectedGuest.name }</h3>
            <form className='flex flex-col' onSubmit={ onSubmitEditGuestForm }>
                <label>
                    <p>Name:</p>
                    <input key={ selectedGuest.id } type='text' name="name" required defaultValue={ selectedGuest.name }/>
                </label>
                <input key={ selectedGuest.id } type="hidden" name='id' value={ selectedGuest.id } />
                <input type="submit" value="Edit" />
            </form>
        </div>  
    )
}
