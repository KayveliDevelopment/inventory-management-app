const fs = require('fs');
const path = require('path');

const { InventoryItem } = require('../models');

exports.updateItem = async (req, res)=> {
  try {
    const item = await InventoryItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({error: 'Item not found'});

    await item.update(req.body);
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'Failed to update item'});

  }
};


exports.deleteItem = async (req, res) => {
  try {
    const item = await InventoryItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // Delete associated image if it exists
    if (item.imageUrl) {
      const imagePath = path.join(__dirname, '..', item.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) console.warn('Could not delete image:', err.message);
        else console.log('Deleted image:', imagePath);
      });
    }

    await item.destroy();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};

exports.getInventory = async (req, res) => {
  const items = await InventoryItem.findAll();
  res.json(items);
};

exports.createItem = async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const item = await InventoryItem.create({
      ...req.body,
      imageUrl,
    });

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create item" });
  }
};
