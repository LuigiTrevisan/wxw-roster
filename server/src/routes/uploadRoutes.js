const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage, getImage, deleteImage } = require('../controllers/uploadController');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 20 * 1024 * 1024, 
    }
});

router.get('/:name', getImage);
router.post('/', upload.single('file'), uploadImage);
router.delete('/:name', deleteImage);

module.exports = router;