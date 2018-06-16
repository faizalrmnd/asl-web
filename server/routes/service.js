const router = require('express').Router()
const images = require('../helpers/images')
const {
    createService,
    getAllService,
    getServiceById,
    updateServiceById,
    deleteServiceById
} = require('../controllers/service.controller')
const { verifyToken } = require('../middlewares/token.middleware')

router.post('/', 
  verifyToken,
  images.multer.single('image'), 
  images.sendUploadToGCS, 
  createService)
router.get('/', verifyToken, getAllService)
router.get('/:id', verifyToken, getServiceById)
router.put('/:id', 
  verifyToken, 
  images.multer.single('image'), 
  images.sendUploadToGCS,
  updateServiceById)
router.delete('/:id', verifyToken, deleteServiceById)

module.exports = router