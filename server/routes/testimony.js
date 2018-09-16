const router = require('express').Router()
const {
    createTestimony,
    getAllTestimony,
    getTestimonyById,
    updateTestimonyById,
    deleteTestimonyById
} = require('../controllers/testimony.controller')
const { verifyToken } = require('../middlewares/token.middleware')
const { multer, multerUpload, sendUploadToGCS } = require('../helpers/image.helper')

router.post('/', verifyToken , multer.single('image'), sendUploadToGCS, createTestimony)
router.get('/', getAllTestimony)
router.get('/:id', getTestimonyById)
router.put('/:id', verifyToken, multerUpload.single('image'), sendUploadToGCS, updateTestimonyById)
router.delete('/:id', verifyToken, deleteTestimonyById)

module.exports = router