const express = require('express');
const { createFile, getFiles } = require('../controller/fileController');

const router = express.Router()

router.post('/create', createFile)
router.get('/', getFiles)

module.exports = router