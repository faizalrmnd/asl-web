const router = require('express').Router()
const {
    createMerchandise,
    getAllMerchandise,
    getMerchandiseById,
    updateMerchandiseById,
    deleteMerchandiseById
} = require('../controllers/merchandise.controller')
const { sendUploadToGCS, multer, multerUpload } = require('../helpers/image.helper')
const { verifyToken } = require('../middlewares/token.middleware')

router.post('/', verifyToken, multer.single('image'), sendUploadToGCS, createMerchandise)
router.get('/', getAllMerchandise)
router.get('/:id', getMerchandiseById)
router.put('/:id', verifyToken, multerUpload.single('image'), sendUploadToGCS, updateMerchandiseById)
router.delete('/:id', verifyToken, deleteMerchandiseById)

module.exports = router