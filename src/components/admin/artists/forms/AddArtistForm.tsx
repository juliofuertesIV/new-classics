import React, { FormEvent } from 'react'
    
export default function AddArtistForm({ onSubmitAddArtist } : { onSubmitAddArtist: (e: FormEvent<HTMLFormElement>) => void }) {
    return (
        <div className='flex-1 flex flex-col border p-4'>
            <h3 className='text-center mb-4'>Add artist</h3>
            <form className='flex flex-col' onSubmit={ onSubmitAddArtist }>
                <label>
                    <p>Name:</p>
                    <input type='text' name="name" required />
                </label>
                <label>
                    <p>About:</p>
                    <input type='text' name="about" />
                </label>
                <input type="submit" value="Add artist" />
            </form>
        </div>
    )
}
