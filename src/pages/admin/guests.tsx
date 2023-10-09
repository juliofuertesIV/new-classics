import GuestForm from '@/components/admin/guests/GuestForm'
import GuestList from '@/components/admin/guests/GuestList'
import { IGuestArtist } from '@/interfaces/guests'
import Layout from '@/layout/Layout'
import AdminNav from '@/layout/admin/AdminNav'
import RegularSection from '@/layout/global/RegularSection'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const getGuests = async () => {
    const guests = await fetch('/api/guests').then(data => data.json())
    return guests
}

export default function AdminGuests() {

    const { data: guests } = useQuery(['getAllGuests'], {
        queryFn: getGuests,
        staleTime: Infinity
    })

    const [ selectedGuest, setSelectedGuest ] = useState<IGuestArtist | null>(null)

    return (
        <Layout darkMode={ true }>
            <AdminNav/>
            <RegularSection title='Artists' className='bg-black'>
                <div className='flex max-w-6xl mx-auto gap-4 my-8 items-start'>
                    <GuestList 
                        guests={ guests }
                        selectedGuest={ selectedGuest }
                        onSelectGuest={ (guest: IGuestArtist) => setSelectedGuest(guest) }
                    /> 
                    <GuestForm selectedGuest={ selectedGuest }/>
                </div>
            </RegularSection>
        </Layout>
    )
}

