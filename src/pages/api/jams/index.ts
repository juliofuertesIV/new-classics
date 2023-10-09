import { Jam } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

export default function routeHandler (req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case "GET": return getAllJams(req, res)
        case "POST": return addJam(req, res)
        default: return res.status(400).json('Bad method.')
    }

}

const getAllJams = async (req: NextApiRequest, res: NextApiResponse) => {

    const artists = await Jam.findAll({ order: [[ 'date', 'ASC' ]]}).then(data => data)
    
    return res.status(200).json(artists)

} 

const addJam = async (req: NextApiRequest, res: NextApiResponse) => {

    const payload = JSON.parse(req.body)

    try {
        const inserted = await Jam.create(payload)
        return res.status(200).json(inserted)
    } catch (e) {
        console.log({ e })
        res.status(500).json(e)
    }
}