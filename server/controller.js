const Stats = require('./model');

getStats = async (req, res) => {
    console.log('test');
    await Stats.find({}, (err, stats) => {
        console.log(stats);
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!stats.length) {
            return res
                .status(404)
                .json({ success: false, error: `stats not found` });
        }
        return res.status(200).json({ success: true, data: stats });
    }).catch(err => console.log(err));
};

module.exports = { getStats };