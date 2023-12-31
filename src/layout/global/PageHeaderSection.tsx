import React from 'react'

export default function PageHeaderSection({ title, children } : { title: string, children?: React.ReactNode }) {
    return (
        <section className="w-full py-8 px-4">
            <header className="text-center">
                <h1 className="w-full my-8">{ title }</h1>
            </header>
            { children }
        </section>
    )
}
