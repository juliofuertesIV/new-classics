import { useMutation } from '@tanstack/react-query'
import React, { FormEvent } from 'react'

interface Props {
    isFor: 'artist' | 'guest'
    ArtistId?: string,
    GuestId?: string
}

export default function HostedImageForm({ isFor, ArtistId, GuestId } : Props) {

    const addImage = async (payload: { src: string, alt: string, width: string, height: string }) => 
        await fetch('/api/images/', { method: 'POST', body: JSON.stringify(payload)})

    const createImageMutation = useMutation({
        mutationFn: addImage,
        onSuccess: (data) => { console.log(data) },
        onError: (error) => console.log(error)
    })

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const payload = Object.fromEntries(new FormData(e.currentTarget)) as { src: string, alt: string, width: string, height: string }

        createImageMutation.mutate(payload)
    }

    if (!ArtistId && isFor === 'artist') return null 
    if (!GuestId && isFor === 'guest') return null 

    return (
        <div className='mt-8'>
            <h3 className='mb-4'>Image</h3>
            <form onSubmit={ onSubmit } className='flex flex-col gap-2'>
                <label>
                    <p>SRC</p>
                    <input type="text" name="src" placeholder='SRC' required/>
                </label>
                <label>
                    <p>ALT</p>
                    <input type="text" name="alt" placeholder='ALT' required/>
                </label>
                <label>
                    <p>WIDTH</p>
                    <input type="text" name="width" placeholder='WIDTH' required/>
                </label>
                <label>
                    <p>HEIGHT</p>
                    <input type="text" name="height" placeholder='HEIGHT' required/>
                </label>
                <input 
                    type="hidden"
                    name={ isFor === 'artist' ? 'ArtistId' : 'GuestId' }
                    value={ isFor === 'artist' ? ArtistId : GuestId } 
                />
                <input type='submit' value="Associate"/>
            </form>
        </div>
    )
}
