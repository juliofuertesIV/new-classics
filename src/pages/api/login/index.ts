import { User, sequelize } from "@/database";
import { IUser } from "@/interfaces/user";
import { nanoid } from "nanoid";
import crypto from 'crypto'
import { NextApiRequest, NextApiResponse } from "next";

export default function handler (req: NextApiRequest, res: NextApiResponse) {  

    switch (req.method) {
        case "POST": return loginUser(req, res)
        default: return res.status(400).json('Bad request method.')
    }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { email, password: inputPassword } = JSON.parse(req.body)

    try {
        await sequelize.transaction(async (t) => {

            const user = await User.findOne({ where: { email }}) as unknown as IUser
            const { hash, salt } = user as { hash: string, salt: string }
            
            if (!validatePassword({ hash, salt, inputPassword })) return res.status(401).json('Bad password')

            const authToken = await updateToken(user.id, res)

            return res.status(200).json({ email, authToken })
        })
    }
    catch (error) {
        res.status(500).json(error)
    }
}

const updateToken = async (id: string, res: NextApiResponse) => {
    
    const newAuthToken = nanoid()

    try {
        await sequelize.transaction(async (t) => {
            await User.update({ authToken: newAuthToken }, { where: { id }, transaction: t })
        })
    }
    catch (error) {
        return res.status(500).json(error)
    }
    return newAuthToken
}

const validatePassword = ({ hash, salt, inputPassword } : { hash: string, salt: string, inputPassword: string }) => {
    const inputHash = crypto
        .pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512')
        .toString('hex')
    const passwordsMatch = hash === inputHash
    return passwordsMatch
}
