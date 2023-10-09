import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { FormEvent } from 'react'
import { IGuestArtist } from '@/interfaces/guests'
import AddGuestForm from './forms/AddGuestForm'
import EditGuestForm from './forms/EditGuestForm'

interface Props {
    selectedGuest: IGuestArtist | null,
}

export default function GuestForm({ selectedGuest } : Props) {
   
    const addGuest = async ({ payload } : { payload: { name: string }}) => 
        await fetch('/api/guests', { method: 'POST', body: JSON.stringify(payload) })

    const editGuest = async ({ payload } : { payload: { name: string }}) => 
        await fetch(`/api/guests/${ selectedGuest?.id }`, { method: 'PUT', body: JSON.stringify(payload) })
    
    const queryClient = useQueryClient()

    const addGuestMutation = useMutation({
        mutationFn: addGuest,
        onSuccess: (data) => { queryClient.invalidateQueries(['getAllGuests']) },
        onError: (error) => { console.log(error) }
    })

    const editGuestMutation = useMutation({
        mutationFn: editGuest,
        onSuccess: (data) => { queryClient.invalidateQueries(['getAllGuests']) },
        onError: (error) => { console.log(error) }
    })

    const onSubmitAddGuestForm = (e: FormEvent<HTMLFormElement>) => {       
        e.preventDefault()
        const payload = Object.fromEntries(new FormData(e.currentTarget)) as { name: string }
        addGuestMutation.mutate({ payload })
        e.currentTarget.reset()
    }

    const onSubmitEditGuestForm = (e: FormEvent<HTMLFormElement>) => {       
        e.preventDefault()
        const payload = Object.fromEntries(new FormData(e.currentTarget)) as { name: string }
        editGuestMutation.mutate({ payload })
        e.currentTarget.reset()
    }

    if (!selectedGuest) return (
        <AddGuestForm
            onSubmitAddGuestForm={ onSubmitAddGuestForm }
        />
    )

    return (
        <EditGuestForm
            onSubmitEditGuestForm={ onSubmitEditGuestForm }
            selectedGuest={ selectedGuest }
        />
    )
}
