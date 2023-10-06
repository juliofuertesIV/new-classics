import { Song } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

export default function routeHandler (req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {

        case "GET": return getSongs(req, res)
        case "POST": return addSong(req, res)
        default: return res.status(400).json('Bad method.')
    }

}

const getSongs = async (req: NextApiRequest, res: NextApiResponse) => {

    const songs = await Song.findAll().then(data => data)
    return res.status(200).json(songs)
} 

const addSong = async (req: NextApiRequest, res: NextApiResponse) => {

    //check permissions

    try {
        const inserted = await Song.create(req.body)
        return res.status(200).json(inserted)
    } catch (e) {
        res.status(500).json(e)
    }
}