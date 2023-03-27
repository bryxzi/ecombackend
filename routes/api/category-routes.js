const router = require('express').Router();
const { Category, Product } = require('../../models');

// Find all categories and include their associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: Product });
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find one category by its `id` value and include its associated products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: Product });
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.json(category);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.update(req.body, { where: { id: req.params.id } });
    if (!category[0]) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.json({ message: 'Category updated' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const result = await Category.destroy({ where: { id: req.params.id } });
    if (!result) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.json({ message: 'Category deleted' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
