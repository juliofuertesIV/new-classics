import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { FormEvent } from 'react'
import AddJamForm from './forms/AddJamForm'
import EditJamForm from './forms/EditJamForm'
import { IJam } from '@/interfaces/jam'

interface Props {
    selectedJam: IJam | null,
}

export default function JamForm({ selectedJam } : Props) {
   
    const addJam = async ({ payload } : { payload: { date: string }}) => 
        await fetch('/api/jams', { method: 'POST', body: JSON.stringify(payload) })

    const editJam = async ({ payload } : { payload: { date: string }}) => 
        await fetch(`/api/jams/${ selectedJam?.id }`, { method: 'PUT', body: JSON.stringify(payload) })
    
    const deleteJam = async () => 
        await fetch(`/api/jams/${ selectedJam?.id }`, { method: 'DELETE' })

    const queryClient = useQueryClient()

    const addJamMutation = useMutation({
        mutationFn: addJam,
        onSuccess: (data) => { queryClient.invalidateQueries(['getAllJams']) },
        onError: (error) => { console.log(error) }
    })

    const editJamMutation = useMutation({
        mutationFn: editJam,
        onSuccess: (data) => { queryClient.invalidateQueries(['getAllJams']) },
        onError: (error) => { console.log(error) }
    })

    const deleteJamMutation = useMutation({
        mutationFn: deleteJam,
        onSuccess: (data) => { queryClient.invalidateQueries(['getAllJams']) },
        onError: (error) => { console.log(error) }
    })

    const onSubmitAddJamForm = (e: FormEvent<HTMLFormElement>) => {       
        e.preventDefault()
        const payload = Object.fromEntries(new FormData(e.currentTarget)) as { date: string }
        addJamMutation.mutate({ payload })
        e.currentTarget.reset()
    }

    const onSubmitEditJamForm = (e: FormEvent<HTMLFormElement>) => {       
        e.preventDefault()
        const payload = Object.fromEntries(new FormData(e.currentTarget)) as { date: string }
        editJamMutation.mutate({ payload })
        e.currentTarget.reset()
    }

    const onDeleteJam = () => {       
        deleteJamMutation.mutate()
    }    

    if (!selectedJam) return (
        <AddJamForm 
            onSubmitAddJamForm={ onSubmitAddJamForm }
        />
    )

    return (
        <EditJamForm 
            onDeleteJam={ onDeleteJam }
            onSubmitEditJamForm={ onSubmitEditJamForm }
            selectedJam={ selectedJam }
        />
    )
}
