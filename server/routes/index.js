const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/token.middleware')
const { verifyUser }= require('../controllers/user.controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/token', verifyToken, verifyUser)

module.exports = router;
