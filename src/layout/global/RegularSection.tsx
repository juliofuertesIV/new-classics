import React from 'react'

export default function RegularSection({ children, title } : { children: React.ReactNode, title: string }) {
    return (
        <section className='w-full py-12'>
            <header>
                <h3 className="text-center my-6">{ title }</h3>
            </header>
            { children }
        </section>
    )
}
