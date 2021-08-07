import cookie from 'cookie';
import { API_URL } from "@/config/index";

export default async (req, res) => {

    if (!req.method == 'GET') {
        res.setHeader('Allow', [`${req.method}`]);
        res.status(405).json({ message: `Method ${req.method} not allowed` })
        return;
    }

    if (!req.headers.cookie) {
        res.status(403).json({ message: 'Not Authorized' });
        return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const apiRes = await fetch(`${API_URL}/users/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        },
    })

    const user = await apiRes.json();

    if (!apiRes.ok) {
        res
            .status(403)
            .json({ message: 'User Forbidden' })
        return
    }

    res.status(200).json(user);
}
