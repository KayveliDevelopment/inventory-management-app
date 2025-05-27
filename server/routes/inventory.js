const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const {
  getInventory,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/inventoryController'); // ✅ move this up

router.get('/', authMiddleware, getInventory);
router.post('/', authMiddleware, upload.single('image'), createItem);
router.put('/:id', authMiddleware, updateItem);
router.delete('/:id', authMiddleware, deleteItem);

module.exports = router;