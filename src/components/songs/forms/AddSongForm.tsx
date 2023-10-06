import { IArtist } from '@/interfaces/songs'
import React, { FormEvent } from 'react'

interface Props {
    artists: IArtist[],
    onSubmitAddSongForm: (e: FormEvent<HTMLFormElement>) => void
}

export default function AddSongForm({ artists, onSubmitAddSongForm } : Props) {
    return (
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
}
