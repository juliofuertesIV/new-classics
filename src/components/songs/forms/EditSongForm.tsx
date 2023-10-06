import { IArtist, ISong, MusicKey, MusicMode } from '@/interfaces/songs'
import React, { FormEvent } from 'react'

interface Props {
    selectedSong: ISong,
    artists: IArtist[],
    onSubmitEditSongForm: (e: FormEvent<HTMLFormElement>) => void,
    musicData: { keys: MusicKey[], modes: MusicMode[] }
}

export default function EditSongForm({ selectedSong, artists, musicData, onSubmitEditSongForm } : Props) {
    return (
        <div className='flex-1 flex flex-col border p-4'>
            <h3 className='text-center mb-4'>{ selectedSong.name }</h3>
            <form className='flex flex-col' onSubmit={ onSubmitEditSongForm }>
                <label>
                    <p>Name:</p>
                    <input type='text' name="name" defaultValue={ selectedSong.name } required />
                </label>
                <label>
                    <p>Lyrics:</p>
                    <textarea name="lyrics" defaultValue={ selectedSong.lyrics || '' } />
                </label>
                <div className='flex gap-4'>
                    <label className='flex-1'>
                        <p>Song key</p>
                        <select name='musicKey' defaultValue={ selectedSong.musicKey }>
                            <option value=""></option>
                            {
                                musicData.keys.map((key, index) => {
                                        return <option key={ index } value={ key }>{ key }</option>
                                    }
                                )
                            }
                        </select>
                    </label>
                    <label className='flex-1'>
                        <p>Song mode</p>
                        <select name='musicMode' defaultValue={ selectedSong.mode }>
                            <option value=""></option>
                            <option value="minor">Minor</option>
                            <option value="major">Major</option>
                        </select>
                    </label>
                </div>
                <label>
                    <p>Artist:</p>
                    <select name="ArtistId" defaultValue={ selectedSong.ArtistId }>
                        <option value=''></option>
                        { 
                            artists.map((artist) =>
                                <option key={ artist.id } value={ artist.id }>{ artist.name }</option>)
                        }
                    </select>
                </label>
                <input type="hidden" name='id' value={ selectedSong.id } />
                <input type="submit" value="Edit" />
            </form>
        </div>  
    )
}
