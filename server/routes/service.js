const router = require('express').Router()
const images = require('../helpers/image.helper')
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
router.get('/', getAllService)
router.get('/:id', getServiceById)
router.put('/:id', 
  verifyToken, 
  images.multerUpload.single('image'), 
  images.sendUploadToGCS,
  updateServiceById)
router.delete('/:id', verifyToken, deleteServiceById)

module.exports = router