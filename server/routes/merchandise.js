const router = require('express').Router()
const {
    createMerchandise,
    getAllMerchandise,
    getMerchandiseById,
    updateMerchandiseById,
    deleteMerchandiseById
} = require('../controllers/merchandise.controller')
const { verifyToken } = require('../middlewares/token.middleware')

router.post('/', verifyToken, createMerchandise)
router.get('/', verifyToken, getAllMerchandise)
router.get('/:id', verifyToken, getMerchandiseById)
router.put('/:id', verifyToken, updateMerchandiseById)
router.delete('/:id', verifyToken, deleteMerchandiseById)

module.exports = router