const mongoose = require('mongoose');

const Schema = mongoose.Schema

const fileSchema = new Schema({
    files: {
        // data: Buffer,
        // contentType: String
        type: String
    }
})

module.exports = mongoose.model('Files', fileSchema)

