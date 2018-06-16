const router = require('express').Router()
const {
    createApplicant,
    getAllApplicant,
    getApplicantById,
    deleteApplicantById
} = require('../controllers/eventapp.controller')
const { verifyToken } = require('../middlewares/token.middleware')

router.post('/', verifyToken, createApplicant)
router.get('/', verifyToken, getAllApplicant)
router.get('/:id', verifyToken, getApplicantById)
router.delete('/:id', verifyToken, deleteApplicantById)

module.exports = router