const express = require('express');
const router = express.Router();
const { getAllWrestlers, getWrestlerById, createWrestler, updateWrestler, deleteWrestler  } = require('../controllers/wrestlerController');

router.get('/', getAllWrestlers);
router.get('/:id', getWrestlerById);
router.post('/', createWrestler);
router.put('/:id', updateWrestler);
router.delete('/:id', deleteWrestler);

module.exports = router;