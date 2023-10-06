import { Artist, HostedImage } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

export default function routeHandler (req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case "POST": return addImage(req, res)
        default: return res.status(400).json('Bad method.')
    }

}

const addImage = async (req: NextApiRequest, res: NextApiResponse) => {

    const payload = JSON.parse(req.body)

    try {
        const inserted = await HostedImage.create(payload)
        return res.status(200).json(inserted)
    } catch (e) {
        console.log({ e })
        res.status(500).json(e)
    }
}