import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export default async function handler (req: NextApiRequest) {

    const authToken = req.cookies['authToken']

    if (!authToken) 
        return NextResponse.redirect(new URL('/login', req.url))

} 

export const config = {
    matcher: '/admin/:path*'
}