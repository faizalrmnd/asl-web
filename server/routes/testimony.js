const router = require('express').Router()
const {
    createTestimony,
    getAllTesimony,
    getTestimonyById,
    updateTestimonyById,
    deleteTestimonyById
} = require('../controllers/testimony.controller')
const { verifyToken } = require('../middlewares/token.middleware')
const { multer, sendUploadToGCS } = require('../helpers/image.helper')

router.post('/', verifyToken, multer.single('image'), sendUploadToGCS ,createTestimony)
router.get('/', verifyToken, getAllTestimony)
router.get('/:id', verifyToken, getTestimonyById)
router.put('/:id', verifyToken, updateTestimonyById)
router.delete('/:id', verifyToken, deleteTestimonyById)

module.exports = router