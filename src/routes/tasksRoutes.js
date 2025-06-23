const express = require('express');
const router = express.Router();
const { getItems, getItemById, createItem, updateItem, deleteItem } =
require('../controllers/tasksController');

router.get('/items', getItems);
router.get('/items/:id', getItemById);
router.post('/items', createItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

module.exports = router;