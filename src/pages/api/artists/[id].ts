
import { Artist } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

export default function routeHandler (req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {

        case "PUT": return editArtist(req, res)
        default: return res.status(400).json('Bad method.')
    }

}


const editArtist = async (req: NextApiRequest, res: NextApiResponse) => {

    const payload = JSON.parse(req.body)
    const { id } = req.query as { id: string }

    try {
        const edited = await Artist.update(payload, { where: { id }})
        return res.status(200).json(edited)
    } catch (e) {
        console.log({ e })
        res.status(500).json(e)
    }
}