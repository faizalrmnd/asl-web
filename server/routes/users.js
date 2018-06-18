const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  changePassword
} = require('../controllers/user.controller')
const { verifyToken } = require('../middlewares/token.middleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/', verifyToken, updateUser)
router.put('/pass', verifyToken, changePassword)
router.delete('/', verifyToken ,deleteUser)

module.exports = router
