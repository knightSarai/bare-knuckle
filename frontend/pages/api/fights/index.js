const { fights } = require('./data.json');

export default (req, res) => {
    if (req.method === 'GET') return res.status(200).json(fights)
    res.setHeader('Allow', ['GET']);
    return res
        .status(405)
        .json({
            message: `${req.method} is not allowed`
        });
}