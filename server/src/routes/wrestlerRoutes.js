const express = require('express');
const router = express.Router();
const verifyToken = require('../config/auth');
const { getAllWrestlers, getWrestlerById, createWrestler, updateWrestler, deleteWrestler  } = require('../controllers/wrestlerController');

router.get('/', getAllWrestlers);
router.get('/:id', verifyToken, getWrestlerById);
router.post('/', verifyToken, createWrestler);
router.put('/:id', verifyToken, updateWrestler);
router.delete('/:id', verifyToken, deleteWrestler);

module.exports = router;