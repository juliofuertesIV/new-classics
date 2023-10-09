import { User, sequelize } from "@/database";
import crypto from 'crypto'
import { customAlphabet } from 'nanoid';
import { NextApiRequest, NextApiResponse } from "next";

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 10);

export default function handler (req: NextApiRequest, res: NextApiResponse) {
    
    switch (req.method) {
        case "GET":
            return getUsers(req, res)
            break;

        case "POST":
            return addUser(req, res)
            break;

        default:
            break;
    }

}

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        await sequelize.transaction(async (t) => {
            const users = await User.findAll()
            res.status(200).json(users)
        })
    }
    catch (error) {
        res.status(500).json(error)
    }
}

const addUser = async (req: NextApiRequest, res: NextApiResponse) => {

    const { name, email, password } = req.body

    const user = createUser({ name, email, password })

    try {
        await sequelize.transaction(async (t) => {
            const instance = await User.create({ ...user }, { transaction: t })
            await instance.save({ transaction: t })
            const response = {
                email: user.email,
                authToken: user.authToken,
            }
            res.status(200).json(response)
        })
    }
    catch (error) {
        console.log(error)
        if (error instanceof Error && error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: { 
                es: 'El email ya existe en la base de datos.',
                en: 'Email address already exists on database.',
                ca: 'El email ja existeix en la base de dades.' }
            })
        }
    }
}

const createUser = (
    { name, email, password } : 
    { name: string, email: string, password: string }
) => {

    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    const authToken = nanoid()

    const user = {
        name,
        email,
        hash,
        salt,
        authToken
    }

    return user
}