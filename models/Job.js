const mongoose = require('mongoose')
//const User = require('./User')
const jobShema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'please provide a company name'],
        maxlenght: 50

    },
    position: {
        type: String,
        required: [true, 'please provide position'],
        maxlenght: 100

    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'

    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide a user name']
    }
}, { timestamps: true })
module.exports = mongoose.model('Job', jobShema)