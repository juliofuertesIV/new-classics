import { Artist, Song } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

export default function routeHandler (req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {

        case "GET": return getSongs(req, res)
        case "POST": return addSong(req, res)
        default: return res.status(400).json('Bad method.')
    }

}

const getSongs = async (req: NextApiRequest, res: NextApiResponse) => {

    const songs = await Song.findAll({ include: [Artist], order: [['name', 'ASC']]}).then(data => data)
    return res.status(200).json(songs)
} 

const addSong = async (req: NextApiRequest, res: NextApiResponse) => {

    const payload = JSON.parse(req.body)

    try {
        const inserted = await Song.create(payload)
        return res.status(200).json(inserted)
    } catch (e) {
        console.log({ e })
        res.status(500).json(e)
    }
}