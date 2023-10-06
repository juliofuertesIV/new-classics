import { IArtist } from '@/interfaces/songs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { FormEvent } from 'react'

const addArtist = async ({ payload } : { payload: { name: string, about?: string }}) => 
    await fetch('/api/artists', { method: 'POST', body: JSON.stringify(payload) })


export default function ArtistForm({ selectedArtist } : { selectedArtist: IArtist | null }) {
    
    const queryClient = useQueryClient()

    const addSongMutation = useMutation({
        mutationFn: addArtist,
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries(['getAllArtists'])
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const onSubmitAddArtist = (e: FormEvent<HTMLFormElement>) => {
        
        e.preventDefault()

        const payload = Object.fromEntries(new FormData(e.currentTarget)) as { name: string, about?: string }

        addSongMutation.mutate({ payload })
    }

    if (!selectedArtist) return (
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

    return (
        <div className='flex-1 flex flex-col border p-4'>
            <h3 className='text-center mb-4'>{ selectedArtist.name }</h3>
            <form className='flex flex-col'>
                <label>
                    <p>Name:</p>
                    <input type='text' name="name" required defaultValue={ selectedArtist.name }/>
                </label>
                <label>
                    <p>About:</p>
                    <input type='text' name="about" defaultValue={ selectedArtist.about || '' }/>
                </label>
            </form>
        </div>  
    )
}
