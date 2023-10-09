import JamForm from '@/components/admin/jams/JamForm'
import JamList from '@/components/admin/jams/JamList'
import { IJam } from '@/interfaces/jam'
import Layout from '@/layout/Layout'
import AdminNav from '@/layout/admin/AdminNav'
import RegularSection from '@/layout/global/RegularSection'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

const getData = async () => {
    const jams = await fetch('/api/jams').then(data => data.json()) as unknown as IJam[]
    return jams
}

export default function AdminSongs() {

    const { data: jams } = useQuery(['getAllJams'], {
        queryFn: getData,
        staleTime: Infinity
    })

    const [ selectedJam, setSelectedJam ] = useState<IJam | null>(null)

    return (
        <Layout darkMode={ true }>
            <AdminNav/>
            <RegularSection title='Songs' className='bg-black'>
                <div className='flex max-w-6xl items-start mx-auto gap-4 my-8'>
                    <JamList
                        jams={ jams }
                        selectedJam={ selectedJam }
                        onSelectJam={ (jam: IJam) => setSelectedJam(jam) }
                    /> 
                    <JamForm 
                        selectedJam={ selectedJam }
                    />
                </div>
            </RegularSection>
        </Layout>
    )
}

