import { IArtist, ISong } from '@/interfaces/songs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { FormEvent } from 'react'
import EditSongForm from './forms/EditSongForm'
import { musicData } from '@/data/music'
import AddSongForm from './forms/AddSongForm'

interface Props {
    selectedSong: ISong | null,
    artists: IArtist[] | undefined
}

export default function SongForm({ selectedSong, artists } : Props) {
   
    const addSong = async ({ payload } : { payload: { name: string, lyrics?: string, ArtistId?: string }}) => 
        await fetch('/api/songs', { method: 'POST', body: JSON.stringify(payload) })

    const editSong = async ({ payload } : { payload: { name: string, lyrics?: string, ArtistId?: string }}) => 
        await fetch(`/api/songs/${ selectedSong?.id }`, { method: 'PUT', body: JSON.stringify(payload) })


    const queryClient = useQueryClient()

    const addSongMutation = useMutation({
        mutationFn: addSong,
        onSuccess: (data) => { queryClient.invalidateQueries(['getAllSongs']) },
        onError: (error) => { console.log(error) }
    })

    const editSongMutation = useMutation({
        mutationFn: editSong,
        onSuccess: (data) => { queryClient.invalidateQueries(['getAllSongs']) },
        onError: (error) => { console.log(error) }
    })

    const onSubmitAddSongForm = (e: FormEvent<HTMLFormElement>) => {       
        e.preventDefault()
        const payload = Object.fromEntries(new FormData(e.currentTarget)) as { name: string, lyrics?: string, ArtistId?: string }
        addSongMutation.mutate({ payload })
        e.currentTarget.reset()
    }

    const onSubmitEditSongForm = (e: FormEvent<HTMLFormElement>) => {       
        e.preventDefault()
        const payload = Object.fromEntries(new FormData(e.currentTarget)) as { id: string, name: string, lyrics?: string, ArtistId?: string }
        editSongMutation.mutate({ payload })
        e.currentTarget.reset()
    } 

    if (!artists) return 'Loading...'

    if (!selectedSong) return (
        <AddSongForm 
            artists={ artists }
            onSubmitAddSongForm={ onSubmitAddSongForm }
        />
    )

    return (
        <EditSongForm 
            onSubmitEditSongForm={ onSubmitEditSongForm }
            selectedSong={ selectedSong }
            artists={ artists }
            musicData={ musicData }
        />
    )
}
