import { IJam } from '@/interfaces/jam'
import React, { FormEvent, useRef, useEffect } from 'react'

interface Props {
    selectedJam: IJam,
    onSubmitEditJamForm: (e: FormEvent<HTMLFormElement>) => void,
    onDeleteJam: () => void
}

export default function EditJamForm({ selectedJam, onDeleteJam, onSubmitEditJamForm } : Props) {

    const { id, date } = selectedJam

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {

        formRef.current?.reset()

    }, [selectedJam])

    return (
        <div className='flex-1 flex flex-col border p-4'>
            <h3 className='text-center mb-4'>{ new Date(date).toLocaleDateString('es-ES', { weekday:'long', day:'2-digit', month:'short', year:'2-digit'}) }</h3>
            <form className='flex flex-col' ref={ formRef } onSubmit={ onSubmitEditJamForm }>
                <label>
                    <p>Date:</p>
                    <input key={ selectedJam.id } type='date' name="date" required />
                </label>
                <label>
                    <p>Doors open:</p>
                    <input key={ selectedJam.id } type='text' name="openDoorsTime" defaultValue={ '20:30:00' }/>
                </label>
                <label>
                    <p>Start time:</p>
                    <input key={ selectedJam.id } type='text' name="openDoorsTime" defaultValue={ '21:00:00' } required />
                </label>                
                <label className='flex flex-row items-center'>
                    <p>Has Guest:</p>
                    <input key={ selectedJam.id } type='checkbox' name="hasGuest" defaultChecked={ selectedJam.hasGuest } />
                </label>
                <input key={ selectedJam.id } type="hidden" name='id' value={ id } />
                <input type="submit" value="Edit" />
                <button type='button' className='border cursor-pointer hover:bg-red-700 py-1' onClick={ () => onDeleteJam() }>DELETE</button>
            </form>
        </div>  
    )
}
