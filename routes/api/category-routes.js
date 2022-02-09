const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({ include: Product}).then(categories => {
    res.json(categories);
  })
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findAll({
    where: {id: req.params.id},
    include: Product
  }).then(categories => {
    res.json(categories);
  })
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then(categories => {
    res.json(categories);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  console.log(req.params.id);
  console.log(req.body);

  Category.update(
    {
      category_name: req.body.category_name
    },
   {
     where: {
      id: req.params.id,
    }}
  )
  .then((newCategory) => {
    console.log(newCategory);
    res.json("Updated!");
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {id : req.params.id}
  }).then(categories => {
    res.json(categories);
  })
});

module.exports = router;
