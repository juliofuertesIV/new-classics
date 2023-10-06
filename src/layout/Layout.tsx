import React from 'react'
import MainNav from './global/MainNav'
import { Roboto_Condensed, Shadows_Into_Light } from 'next/font/google'

const bodyFont = Roboto_Condensed({ 
    subsets: ['latin'],
    weight: ['300', '400', '700'],
    variable: '--font-regular' 
  })
  
  const displayFont = Shadows_Into_Light({ 
    subsets: ['latin'],
    weight: '400',
    variable: '--font-display'
  })

export default function Layout({ children, darkMode } : { children: React.ReactNode, darkMode?: boolean }) {
    return (
        <main className={`flex flex-col h-full flex-1 items-center min-h-screen ${ displayFont.variable } ${ bodyFont.variable } ${ darkMode ? 'bg-black' : 'bg-white'}` }>
            <MainNav/>
            { children }
            <footer className='flex w-full text-sm mt-auto items-center py-8'>
                <div>The New Classics</div>
            </footer>
        </main>
    )
}
