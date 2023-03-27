const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Find all tags and include their associated Product data
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({ include: { model: Product, through: ProductTag, as: 'products' } });
    res.json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find a single tag by its `id` and include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, { include: { model: Product, through: ProductTag, as: 'products' } });
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.json(tag);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new tag
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.update(req.body, { where: { id: req.params.id } });
    if (!tag[0]) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.json({ message: 'Tag updated' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete one tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const result = await Tag.destroy({ where: { id: req.params.id } });
    if (!result) {
      res.status(404).json({ message: 'Tag not found' });
    } else {
      res.json({ message: 'Tag deleted' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
