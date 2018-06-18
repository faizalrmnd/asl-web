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
router.get('/', multerUpload.single('image'), sendUploadToGCS, getAllMerchandise)
router.get('/:id', verifyToken, getMerchandiseById)
router.put('/:id', verifyToken, updateMerchandiseById)
router.delete('/:id', verifyToken, deleteMerchandiseById)

module.exports = router