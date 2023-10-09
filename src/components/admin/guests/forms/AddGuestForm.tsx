import React, { FormEvent } from 'react'
    
export default function AddGuestForm({ onSubmitAddGuestForm } : { onSubmitAddGuestForm: (e: FormEvent<HTMLFormElement>) => void }) {
    return (
        <div className='flex-1 flex flex-col border p-4'>
            <h3 className='text-center mb-4'>Add guest</h3>
            <form className='flex flex-col' onSubmit={ onSubmitAddGuestForm }>
                <label>
                    <p>Name:</p>
                    <input type='text' name="name" required />
                </label>
                <input type="submit" value="Add" />
            </form>
        </div>
    )
}
