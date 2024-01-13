const Files = require('../model/fileModel.js')

const createFile = async (req, res) => {
    const { files } = req.body

    const file = await Files.create({ files })

    if (!file) {
        return res.status(404).json({ msg: 'File could not created' })
    }

    res.status(200).json({
        success: true,
        data: file
    })
}

const getFiles = async (req, res) => {
    const files = await Files.find({})

    if (!files) {
        return res.status(404).json({ msg: 'File could not Found' })
    }

    res.status(200).json({
        success: true,
        data: files
    })
}

module.exports = { createFile, getFiles }