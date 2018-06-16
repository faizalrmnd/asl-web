const router = require('express').Router()
const {
    uploadNewPicture,
    deleteImage,
    getAllPicture
} = require('../controllers/image.controller')
const {
    multer,
    sendUploadToGCS,
} = require('../helpers/image.helper')

router.post('/', multer.single('file'), sendUploadToGCS, uploadNewPicture)
router.get('/', getAllPicture)
router.delete('/:id', deleteImage)

module.exports = router