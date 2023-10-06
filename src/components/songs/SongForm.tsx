import { IArtist, ISong } from '@/interfaces/songs'
import React from 'react'

interface Props {
    selectedSong: ISong | null,
    artists: IArtist[] | undefined
}

export default function SongForm({ selectedSong, artists } : Props) {

    if (!artists) return 'Loading...'

    if (!selectedSong) return (
        <div className='flex-1 flex flex-col border p-4'>
            <h3 className='text-center mb-4'>Add song</h3>
            <form className='flex flex-col'>
                <label className='flex flex-col'>
                    <p>Name:</p>
                    <input type='text' className='px-2 py-1 text-black' name="name" required />
                </label>
                <label className='flex flex-col'>
                    <p>About:</p>
                    <input type='text' className='px-2 py-1 text-black' name="about" />
                </label>
                <label className='flex flex-col'>
                    <p>Artist:</p>
                    <select name="ArtistId" className='text-black'>
                        <option value=''></option>
                        { 
                            artists.map((artist) => 
                            <option 
                                key={ artist.id }
                                className='text-black'
                                value={ artist.id }>
                                    { artist.name }
                                </option>
                            )
                        }
                    </select>
                </label>
            </form>
        </div>
    )

    return (
        <div className='flex-1 flex flex-col border p-4'>
            <h3 className='text-center mb-4'>{ selectedSong.name }</h3>
            <form className='flex flex-col'>
                <label className='flex flex-col'>
                    <p>Name:</p>
                    <input type='text' className='px-2 py-1 text-black' name="name" required defaultValue={ selectedSong.name }/>
                </label>
                <label className='flex flex-col'>
                    <p>Lyrics:</p>
                    <input type='text' className='px-2 py-1 text-black' name="about" defaultValue={ selectedSong.lyrics || '' }/>
                </label>
                <label className='flex flex-col'>
                    <p>Artist:</p>
                    <select name="ArtistId">
                        <option value=''></option>
                        { 
                            artists.map((artist) => 
                            <option 
                                key={ artist.id }
                                className='text-black'
                                value={ artist.id }>
                                    { artist.name }
                                </option>
                            )
                        }
                    </select>
                </label>
            </form>
        </div>  
    )
}
