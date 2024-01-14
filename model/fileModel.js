const mongoose = require('mongoose');

const Schema = mongoose.Schema

const fileSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    files: {
        type: Array
    }
}, {
    collection: 'filesCollection'
})

module.exports = mongoose.model('Files', fileSchema)

