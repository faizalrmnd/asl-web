const router = require('express').Router()
const {
    createApplicant,
    getAllApplicant,
    getApplicantById,
    deleteApplicantById,
    getApplicantsByEventId
} = require('../controllers/eventapp.controller')
const { verifyToken } = require('../middlewares/token.middleware')

router.post('/', createApplicant)
router.get('/', verifyToken, getAllApplicant)
router.get('/:id', verifyToken, getApplicantById)
router.get('/event/:id', verifyToken, getApplicantsByEventId)
router.delete('/:id', verifyToken, deleteApplicantById)

module.exports = router