const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//user schema
const User = new Schema({}, { strict: false });

const UserModel = mongoose.model('stats', User);
module.exports = UserModel;