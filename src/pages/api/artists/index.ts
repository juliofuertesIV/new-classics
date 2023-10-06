import { Artist } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

export default function routeHandler (req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case "GET": return getAllArtists(req, res)
        case "POST": return addArtist(req, res)
        default: return res.status(400).json('Bad method.')
    }

}

const getAllArtists = async (req: NextApiRequest, res: NextApiResponse) => {

    const artists = await Artist.findAll({ order: [[ 'name', 'ASC' ]]}).then(data => data)
    
    return res.status(200).json(artists)

} 

const addArtist = async (req: NextApiRequest, res: NextApiResponse) => {

    const payload = JSON.parse(req.body)

    try {
        const inserted = await Artist.create(payload)
        return res.status(200).json(inserted)
    } catch (e) {
        console.log({ e })
        res.status(500).json(e)
    }
}