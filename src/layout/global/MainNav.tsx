import Link from 'next/link'
import React from 'react'

export default function MainNav() {
    return (
        <nav className='w-full flex justify-center bg-zinc-50 text-zinc-900 uppercase'>
            <div className='flex flex-1'>
                <Link className='py-2 px-2 w-full no-underline uppercase' href={ '/' }>LOGO</Link>
            </div>
            <div className='flex'>
                <Link className='py-2 px-2 text-center no-underline uppercase' href={ 'canciones' }>Canciones</Link>
                <Link className='py-2 px-2 text-center no-underline uppercase' href={ 'invitados' }>Banda invitada</Link>
                <Link className='py-2 px-2 text-center no-underline uppercase' href={ 'contacto' }>Contacto</Link>
                <Link className='py-2 px-2 text-center no-underline uppercase' href={ 'admin' }>Admin</Link>
            </div>
        </nav>
    )
}
