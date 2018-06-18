const router = require('express').Router()
const {
    createAbout,
    getAbout,
    updateAbout
} = require('../controllers/about.controller')
const { verifyToken } = require('../middlewares/token.middleware')

router.post('/', verifyToken, createAbout)
router.get('/', getAbout)
router.put('/', verifyToken, updateAbout)

module.exports = router