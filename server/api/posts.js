const router = require("express").Router();
const axios = require("axios")
module.exports = router;
let posts = require("../data");

router.get("/", async (req, res, next) => {
  let { tags, sortBy, direction } = req.query;
  sortBy = sortBy ? sortBy.trim(" ") : "id";
  direction = direction ? direction.trim(" ") : "asc";
  const validSortBy = ["id", "reads", "likes", "popularity"];
  const validDirection = ["asc", "desc"];

  // Return errors for missing or invalid parameters
  if (!tags) {
    return res.status(400).json({ error: "Tags parameter is required" });
  }

  if (!validSortBy.includes(sortBy.toLowerCase())) {
    return res.status(400).json({ error: "sortBy parameter is invalid" });
  }

  if (!validDirection.includes(direction.toLowerCase())) {
    return res.status(400).json({ error: "Direction parameter is invalid" });
  }

  // Send result based on the tags provided
  tags = tags.split(",");

  try {








  } catch (error) {
    res.json({ posts: [] });
  }
});
