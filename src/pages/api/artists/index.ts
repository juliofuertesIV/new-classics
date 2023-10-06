import { Artist } from "@/database";
import { NextApiRequest, NextApiResponse } from "next";

export default function routeHandler (req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case "GET":
            return getAllArtists(req, res)
            break;
    
        default:
            break;
    }

}

const getAllArtists = async (req: NextApiRequest, res: NextApiResponse) => {

    const artists = await Artist.findAll({ order: [[ 'name', 'ASC' ]]}).then(data => data)
    
    return res.status(200).json(artists)

} 