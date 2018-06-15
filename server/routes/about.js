const router = require('express').Router()
const {
    createAbout,
    getAllAbout,
    getAboutById,
    updateAboutById,
    deleteAboutById
} = require('../controllers/about.controller')
const { verifyToken } = require('../middlewares/token.middleware')

router.post('/', verifyToken, createAbout)
router.get('/', verifyToken, getAllAbout)
router.get('/:id', verifyToken, getAboutById)
router.put('/:id', verifyToken, updateAboutById)
router.delete('/:id', verifyToken, deleteAboutById)

module.exports = router