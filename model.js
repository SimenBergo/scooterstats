const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//user schema
const Stats = new Schema({
    falls: {
        type: Array,
    },
    time_start: {
        type: Date,
        required: true,
    },
    time_end: {
        type: Date,
        required: true,
    }
});

const StatsModel = mongoose.model('stats', Stats);
module.exports = StatsModel;