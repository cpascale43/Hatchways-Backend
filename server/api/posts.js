const router = require("express").Router();
const axios = require("axios");
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
  let response;

  await Promise.all(
    tags.map(async (tag) => {
      response = await axios.get(
        `https://hatchways.io/api/assessment/blog/posts?tag=${tag.trim(
          " "
        )}&sortBy=${sortBy}&direction=${direction}`
      );
    })
  );

  // sort the posts arraylist based on the sortby
  posts.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  // return reverse posts array if direction is desecnding
  if (direction === "desc") return res.json({ posts: posts.reverse() });

  return res.json({ posts });

  try {
  } catch (error) {
    res.json({ posts: [] });
  }
});
