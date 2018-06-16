const router = require('express').Router()
const images = require('../helpers/images')
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
router.get('/', verifyToken, getAllEvents)
router.get('/:id', verifyToken, getEventsById)
router.put('/:id', 
  verifyToken, 
  images.multer.single('image'), 
  images.sendUploadToGCS,
  updateEventsById)
router.delete('/:id', verifyToken, deleteEventsById)

module.exports = router