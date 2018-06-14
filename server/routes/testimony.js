const router = require('express').Router()
const {
    createTestimony,
    getAllTesimony,
    getTestimonyById,
    updateTestimonyById,
    deleteTestimonyById
} = require('../controllers/testimony.controller')
const { verifyToken } = require('../middlewares/token.middleware')

router.post('/', verifyToken, createTestimony)
router.get('/', verifyToken, getAllTesimony)
router.get('/:id', verifyToken, getTestimonyById)
router.put('/:id', verifyToken, updateTestimonyById)
router.delete('/:id', verifyToken, deleteTestimonyById)

module.exports = router