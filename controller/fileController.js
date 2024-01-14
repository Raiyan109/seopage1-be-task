const Files = require('../model/fileModel.js')
const express = require('express');
const mongoose = require('mongoose');
const { v4 } = require('uuid');
const router = express.Router()
const multer = require('multer');
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, v4() + '-' + fileName)
    }
})

const upload = multer({
    storage: storage,
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //         cb(null, true);
    //     } else {
    //         cb(null, false);
    //         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    //     }
    // }
})


router.post('/create', upload.array('files', 6), (req, res, next) => {
    const { files } = req.body
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host')
    for (let i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/public/' + req.files[i].filename)
    }

    const file = new Files({
        _id: new mongoose.Types.ObjectId(),
        files: reqFiles
    })

    file.save().then(result => {
        res.status(201).json({
            msg: 'Uploaded!',
            fileCreated: {
                _id: result._id,
                files: result.files
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})



router.get("/", async (req, res, next) => {
    const totalFiles = await Files.countDocuments()
    console.log(totalFiles);
    Files.find().then(data => {
        res.status(200).json({
            message: "Files list retrieved successfully!",
            filesCollection: data,
            totalFiles: totalFiles
        });
    });
});

module.exports = router