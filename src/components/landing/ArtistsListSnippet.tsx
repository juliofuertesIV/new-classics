import React from 'react'

export default function ArtistsListSnippet() {
  return (
        <div className="flex flex-col gap-4 items-center">
        {
            artists.map((artist) => (
                <article key={ artist.id } className="flex justify-end bg-zinc-900 w-full max-w-lg h-32 items-center">
                <div className="flex items-center w-fit h-fit p-2 mr-4 text-black bg-white">
                    <h3>{ artist.name }</h3>
                </div>
                </article>
            ))
        }
        </div>
    )
}
