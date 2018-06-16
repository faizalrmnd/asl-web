const router = require('express').Router()
const {
    createContact,
    getAllContact,
    getContactById,
    respondContactById,
    deleteContactById
} = require('../controllers/contact.controller')
const { verifyToken } = require('../middlewares/token.middleware')

router.post('/', verifyToken, createContact)
router.get('/', verifyToken, getAllContact)
router.get('/:id', verifyToken, getContactById)
router.put('/:id', verifyToken, respondContactById)
router.delete('/:id', verifyToken, deleteContactById)

module.exports = router