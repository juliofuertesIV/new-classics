import { IArtist, ISong } from '@/interfaces/songs'
import Layout from '@/layout/Layout'
import AdminNav from '@/layout/admin/AdminNav'
import RegularSection from '@/layout/global/RegularSection'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import SongForm from '@/components/songs/SongForm'
import SongList from '@/components/songs/SongList'

const getData = async () => {
    const songs = await fetch('/api/songs').then(data => data.json()) as unknown as ISong[]
    const artists = await fetch('/api/artists').then(data => data.json()) as unknown as IArtist[]
    return { songs, artists }
}

export default function AdminSongs() {

    const { data: musicData } = useQuery(['getAllSongs'], {
        queryFn: getData,
        staleTime: Infinity
    })

    const [ selectedSong, setSelectedSong ] = useState<ISong | null>(null)

    if (!musicData) return ('Loading...')

    const { artists, songs } = musicData

    return (
        <Layout darkMode={ true }>
            <AdminNav/>
            <RegularSection title='Songs' className='bg-black'>
                <div className='flex max-w-6xl items-start mx-auto gap-4 my-8'>
                    <SongList
                        songs={ songs }
                        selectedSong={ selectedSong }
                        onSelectSong={ (song: ISong) => setSelectedSong(song) }
                    /> 
                    <SongForm 
                        artists={ artists }
                        selectedSong={ selectedSong }
                    />
                </div>
            </RegularSection>
        </Layout>
    )
}

