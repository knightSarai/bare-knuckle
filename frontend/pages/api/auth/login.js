import cookie from 'cookie';
import { API_URL } from "@/config/index";

export default async (req, res) => {

    if (!req.method === 'POST') {
        res.setHeader('Allow', [`${req.method}`]);
        res.status(405).json({ message: `Method ${req.method} not allowed` })
        return;
    }

    const { identifier, password } = req.body;

    const apiRes = await fetch(`${API_URL}/auth/local`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identifier,
            password
        })
    })

    const data = await apiRes.json();

    if (!apiRes.ok) {
        res
            .status(data.statusCode)
            .json({ message: data.message[0].messages[0].message })
        return
    }

    res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24 * 7,
            sameSite: 'strict',
            path: '/'
        })
    )

    res.status(200).json({ user: data.user });

}
