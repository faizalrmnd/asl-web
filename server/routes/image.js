const router = require('express').Router()
const {
    uploadNewPicture,
    deleteImage
} = require('../controllers/image.controller')
const {
    multer,
    sendUploadToGCS,
} = require('../helpers/image.helper')

router.post('/', multer.single('image'), sendUploadToGCS, uploadNewPicture)
router.delete('/:id', deleteImage)

module.exports = router