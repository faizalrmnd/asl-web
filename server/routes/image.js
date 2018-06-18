const router = require('express').Router()
const {
    sendPictureUrl
} = require('../controllers/image.controller')
const {
    multer,
    sendUploadToGCS,
} = require('../helpers/image.helper')

router.post('/', multer.single('file'), sendUploadToGCS, sendPictureUrl)

module.exports = router