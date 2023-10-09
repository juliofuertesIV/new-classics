import React, { FormEvent } from 'react'

interface Props {
    onSubmitAddJamForm: (e: FormEvent<HTMLFormElement>) => void
}

export default function AddJamForm({ onSubmitAddJamForm } : Props) {
    return (
        <div className='flex-1 flex flex-col border p-4'>
            <h3 className='text-center mb-4'>Add jam</h3>
            <form className='flex flex-col' onSubmit={ onSubmitAddJamForm }>
                <label>
                    <p>Date:</p>
                    <input type='date' name="date" required/>
                </label>
                <input type="submit" value="Add"/>
            </form>
        </div>  
    )
}
