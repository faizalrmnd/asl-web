const router = require('express').Router()
const images = require('../helpers/image.helper')
const {
    createEvents,
    getAllEvents,
    getEventsById,
    updateEventsById,
    deleteEventsById
} = require('../controllers/event.controller')
const { verifyToken } = require('../middlewares/token.middleware')

router.post('/', 
  verifyToken,
  images.multer.single('image'), 
  images.sendUploadToGCS, 
  createEvents)
router.get('/', getAllEvents)
router.get('/:id', getEventsById)
router.put('/:id', 
  verifyToken, 
  images.multerUpload.single('image'), 
  images.sendUploadToGCS,
  updateEventsById)
router.delete('/:id', verifyToken, deleteEventsById)

module.exports = router