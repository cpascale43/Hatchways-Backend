const router = require('express').Router()
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const posts = require('../data')
    res.json(posts)
  } catch (err) {
    next(err)
  }
})
