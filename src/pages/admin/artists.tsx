import ArtistList from '@/components/artists/ArtistList'
import ArtistForm from '@/components/artists/ArtistForm'
import { IArtist } from '@/interfaces/songs'
import Layout from '@/layout/Layout'
import AdminNav from '@/layout/admin/AdminNav'
import RegularSection from '@/layout/global/RegularSection'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const getArtists = async () => {
    const artists = await fetch('/api/artists').then(data => data.json())
    return artists
}

export default function AdminArtists() {

    const { data: artists } = useQuery(['getAllArtists'], {
        queryFn: getArtists,
        staleTime: Infinity
    })

    const [ selectedArtist, setSelectedArtist ] = useState<IArtist | null>(null)

    return (
        <Layout darkMode={ true }>
            <AdminNav/>
            <RegularSection title='Artists' className='bg-black'>
                <div className='flex max-w-5xl mx-auto gap-4 my-8'>
                    <ArtistList 
                        artists={ artists }
                        selectedArtist={ selectedArtist }
                        onSelectArtist={ (artist: IArtist) => setSelectedArtist(artist) }
                    /> 
                    <ArtistForm selectedArtist={ selectedArtist }/>
                </div>
            </RegularSection>
        </Layout>
    )
}

