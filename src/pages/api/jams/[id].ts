
import { Jam } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

export default function routeHandler (req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {

        case "PUT": return editJam(req, res)
        case "DELETE": return deleteJam(req, res)
        default: return res.status(400).json('Bad method.')
    }

}

const deleteJam = async (req: NextApiRequest, res: NextApiResponse) => {

    const { id } = req.query as { id: string }

    try {
        const deleted = await Jam.destroy({ where: { id } })
        return res.status(200).json(deleted)
    }
    catch (e) {
        console.log({ e })
        res.status(500).json(e)        
    }

}

const editJam = async (req: NextApiRequest, res: NextApiResponse) => {

    const payload = JSON.parse(req.body)
    const { id } = req.query as { id: string }

    try {
        const edited = await Jam.update(payload, { where: { id }})
        return res.status(200).json(edited)
    } catch (e) {
        console.log({ e })
        res.status(500).json(e)
    }
}