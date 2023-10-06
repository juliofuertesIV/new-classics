import { IArtist } from '@/interfaces/songs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { FormEvent } from 'react'
import AddArtistForm from '../artists/forms/AddArtistForm'
import EditArtistForm from '../artists/forms/EditArtistForm'

export default function ArtistForm({ selectedArtist } : { selectedArtist: IArtist | null }) {
    
    const queryClient = useQueryClient()
    
    const addArtist = async ({ payload } : { payload: { name: string, about?: string }}) => 
        await fetch('/api/artists', { method: 'POST', body: JSON.stringify(payload) })
    
    const editArtist = async ({ payload } : { payload: { name: string, lyrics?: string, ArtistId?: string }}) => 
        await fetch(`/api/artists/${ selectedArtist?.id }`, { method: 'PUT', body: JSON.stringify(payload) })


    const addArtistMutation = useMutation({
        mutationFn: addArtist,
        onSuccess: (data) => { queryClient.invalidateQueries(['getAllArtists']) },
        onError: (error) => { console.log(error) }
    })

    const editArtistMutation = useMutation({
        mutationFn: editArtist,
        onSuccess: (data) => { queryClient.invalidateQueries(['getAllSongs']) },
        onError: (error) => { console.log(error) }
    })    

    const onSubmitAddArtist = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const payload = Object.fromEntries(new FormData(e.currentTarget)) as { name: string, about?: string }
        addArtistMutation.mutate({ payload })
    }

    const onSubmitEditArtist = (e: FormEvent<HTMLFormElement>) => {       
        e.preventDefault()
        const payload = Object.fromEntries(new FormData(e.currentTarget)) as { id: string, name: string, lyrics?: string, ArtistId?: string }
        editArtistMutation.mutate({ payload })
        e.currentTarget.reset()
    }     

    if (!selectedArtist) return (
        <AddArtistForm 
            onSubmitAddArtist={ onSubmitAddArtist }
        />
    )

    return (
        <EditArtistForm 
            onSubmitEditArtist={ onSubmitEditArtist }
            selectedArtist={ selectedArtist }
        />
    )
}