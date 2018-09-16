const router = require('express').Router()
const {
    createArticle,
    getAllArticle,
    getArticleById,
    updateArticleById,
    deleteArticleById
} = require('../controllers/article.controller')
const { verifyToken } = require('../middlewares/token.middleware')
const { multer, multerUpload, sendUploadToGCS } = require('../helpers/image.helper')

router.post('/', verifyToken, multer.single('image'), sendUploadToGCS, createArticle)
router.get('/', getAllArticle)
router.get('/:id', getArticleById)
router.put('/:id', verifyToken, multerUpload.single('image'), sendUploadToGCS, updateArticleById)
router.delete('/:id', verifyToken, deleteArticleById)

module.exports = router