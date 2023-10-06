import { IArtist, ISong, MusicKey, MusicMode } from '@/interfaces/songs'
import { Mutable } from 'next/dist/client/components/router-reducer/router-reducer-types'
import React, { FormEvent, useRef, useEffect, MutableRefObject } from 'react'

interface Props {
    selectedSong: ISong,
    artists: IArtist[],
    onSubmitEditSongForm: (e: FormEvent<HTMLFormElement>) => void,
    musicData: { keys: MusicKey[], modes: MusicMode[] }
}

export default function EditSongForm({ selectedSong, artists, musicData, onSubmitEditSongForm } : Props) {

    const { id, name, lyrics, musicKey, musicMode, ArtistId } = selectedSong

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {

        formRef.current?.reset()

    }, [selectedSong])

    return (
        <div className='flex-1 flex flex-col border p-4'>
            <h3 className='text-center mb-4'>{ name }</h3>
            <form className='flex flex-col' ref={ formRef } onSubmit={ onSubmitEditSongForm }>
                <label>
                    <p>Name:</p>
                    <input key={ selectedSong.id } type='text' name="name" defaultValue={ name } required />
                </label>
                <label>
                    <p>Lyrics:</p>
                    <textarea key={ selectedSong.id } name="lyrics" defaultValue={ lyrics } />
                </label>
                <div className='flex gap-4'>
                    <label className='flex-1'>
                        <p>Song key</p>
                        <select key={ selectedSong.id } name='musicKey' defaultValue={ musicKey }>
                            <option value=""></option>
                            {
                                musicData.keys.map(key => {
                                        return <option key={ key } value={ key }>{ key }</option>
                                    }
                                )
                            }
                        </select>
                    </label>
                    <label className='flex-1'>
                        <p>Song mode</p>
                        <select key={ selectedSong.id } name='musicMode' defaultValue={ musicMode }>
                            <option value=""></option>
                            <option value="minor">Minor</option>
                            <option value="major">Major</option>
                        </select>
                    </label>
                </div>
                <label>
                    <p>Artist:</p>
                    <select key={ selectedSong.id } name="ArtistId" defaultValue={ ArtistId }>
                        <option value=''></option>
                        { 
                            artists.map((artist) =>
                                <option key={ artist.id } value={ artist.id }>{ artist.name }</option>)
                        }
                    </select>
                </label>
                <input key={ selectedSong.id } type="hidden" name='id' value={ id } />
                <input type="submit" value="Edit" />
            </form>
        </div>  
    )
}
