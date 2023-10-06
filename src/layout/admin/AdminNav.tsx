import Link from 'next/link'
import React from 'react'

export default function AdminNav() {
    return (
        <nav className='flex gap-2 max-w-lg bg-black mt-4'>
            <Link href={ '/admin/requests' } className='bg-white text-black px-4 py-1 uppercase rounded-sm'>Requests</Link>
            <Link href={ '/admin/jams' } className='bg-white text-black px-4 py-1 uppercase rounded-sm'>Jams</Link>
            <Link href={ '/admin/guests' } className='bg-white text-black px-4 py-1 uppercase rounded-sm'>Guests</Link>
            <Link href={ '/admin/artists' } className='bg-white text-black px-4 py-1 uppercase rounded-sm'>Artists</Link>
            <Link href={ '/admin/songs' } className='bg-white text-black px-4 py-1 uppercase rounded-sm'>Songs</Link>
        </nav>
    )
}
