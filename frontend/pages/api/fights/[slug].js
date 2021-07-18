const { fights } = require('./data.json');

export default (req, res) => {
    const fight = fights.filter(fight => fight.slug === req.query.slug)
    if (req.method === 'GET') return res.status(200).json(fight)
    res.setHeader('Allow', ['GET']);
    return res
        .status(405)
        .json({
            message: `${req.method} is not allowed`
        });
}