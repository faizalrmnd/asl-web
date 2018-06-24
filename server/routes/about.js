const router = require('express').Router()
const {
    createUpdateAbout,
    getAbout
} = require('../controllers/about.controller')
const { verifyToken } = require('../middlewares/token.middleware')

router.post('/', verifyToken, createUpdateAbout)
router.get('/', getAbout)
module.exports = router