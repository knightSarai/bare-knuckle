import cookie from 'cookie';
import { API_URL } from "@/config/index";

export default async (req, res) => {

    if (!req.method == 'POST') {
        res.setHeader('Allow', [`${req.method}`]);
        res.status(405).json({ message: `Method ${req.method} not allowed` })
        return;
    }

    res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: new Date(),
            sameSite: 'strict',
            path: '/'
        })
    )

    res.status(200).json({ message: "Logged out" });
}
