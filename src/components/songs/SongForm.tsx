import { IArtist, ISong } from '@/interfaces/songs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { FormEvent } from 'react'

interface Props {
    selectedSong: ISong | null,
    artists: IArtist[] | undefined
}

const addSong = async ({ payload } : { payload: { name: string, lyrics?: string, ArtistId?: string }}) => 
    await fetch('/api/songs', { method: 'POST', body: JSON.stringify(payload) })


export default function SongForm({ selectedSong, artists } : Props) {

    const queryClient = useQueryClient()

    const addSongMutation = useMutation({
        mutationFn: addSong,
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries(['getAllSongs'])
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const onSubmitAddSongForm = (e: FormEvent<HTMLFormElement>) => {
        
        e.preventDefault()

        const payload = Object.fromEntries(new FormData(e.currentTarget)) as { name: string, lyrics?: string, ArtistId?: string }

        addSongMutation.mutate({ payload })
    }

    if (!artists) return 'Loading...'


    
    if (!selectedSong) return (
        <div className='flex-1 flex flex-col border p-4'>
            <h3 className='text-center mb-4'>Add song</h3>
            <form className='flex flex-col' onSubmit={ onSubmitAddSongForm }>
                <label>
                    <p>Name:</p>
                    <input type='text' name="name" required/>
                </label>
                <label>
                    <p>Lyrics:</p>
                    <textarea name="lyrics" />
                </label>
                <label>
                    <p>Artist:</p>
                    <select name="ArtistId">
                        <option value=''></option>
                        { 
                            artists.map((artist) => 
                            <option 
                                key={ artist.id }
                                value={ artist.id }>
                                    { artist.name }
                                </option>
                            )
                        }
                    </select>
                </label>
                <input type="submit" value="Add"/>
            </form>
        </div>
    )

    return (
        <div className='flex-1 flex flex-col border p-4'>
            <h3 className='text-center mb-4'>{ selectedSong.name }</h3>
            <form className='flex flex-col'>
                <label>
                    <p>Name:</p>
                    <input type='text' name="name" defaultValue={ selectedSong.name } required />
                </label>
                <label>
                    <p>Lyrics:</p>
                    <input type='text' name="about" defaultValue={ selectedSong.lyrics || '' } />
                </label>
                <label>
                    <p>Artist:</p>
                    <select name="ArtistId">
                        <option value=''></option>
                        { 
                            artists.map((artist) =>
                                <option selected={ artist.id === selectedSong.ArtistId} key={ artist.id } value={ artist.id }>{ artist.name }</option>)
                        }
                    </select>
                </label>
            </form>
        </div>  
    )
}
