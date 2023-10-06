import React from 'react'

interface Props {
    children: React.ReactNode,
    title?: string,
    className?: string
}

export default function RegularSection({ children, title, className } : Props) {
    return (
        <section className={`w-full py-12 ${ className }`}>
            <header>
                <h2 className="text-center my-6">{ title }</h2>
            </header>
            { children }
        </section>
    )
}
