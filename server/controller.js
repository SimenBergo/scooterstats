const User = require('./model');

getStats = async (req, res) => {
    console.log('test');
    await User.find({}, (err, users) => {
        console.log(users);
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` });
        }
        return res.status(200).json({ success: true, data: users });
    }).catch(err => console.log(err));
};

module.exports = { getStats };