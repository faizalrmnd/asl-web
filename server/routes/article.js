const router = require('express').Router()
const {
    createArticle,
    getAllArticle,
    getArticleById,
    updateArticleById,
    deleteArticleById
} = require('../controllers/article.controller')
const { verifyToken } = require('../middlewares/token.middleware')

router.post('/', verifyToken, createArticle)
router.get('/', getAllArticle)
router.get('/:id', verifyToken, getArticleById)
router.put('/:id', verifyToken, updateArticleById)
router.delete('/:id', verifyToken, deleteArticleById)

module.exports = router