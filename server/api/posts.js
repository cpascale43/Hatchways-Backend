const router = require("express").Router();
const axios = require("axios");
module.exports = router;

router.get("/", async (req, res, next) => {
  let { tags, sortBy, direction } = req.query;
  sortBy = sortBy ? sortBy.trim(" ") : "id";
  direction = direction ? direction.trim(" ") : "asc";
  const validSortBy = ["id", "reads", "likes", "popularity"];
  const validDirection = ["asc", "desc"];
  const duplicates = new Set();

  // Send errors for missing or invalid parameters
  if (!tags) {
    res.status(400).json({ error: "Tags parameter is required" });
  }

  if (!validSortBy.includes(sortBy.toLowerCase())) {
    res.status(400).json({ error: "sortBy parameter is invalid" });
  }

  if (!validDirection.includes(direction.toLowerCase())) {
    res.status(400).json({ error: "Direction parameter is invalid" });
  }

  // Send result based on the tags provided
  tags = tags.split(",");
  try {
    let posts = await Promise.all(
      tags.map(async (tag) => {
        response = await axios(
          `https://hatchways.io/api/assessment/blog/posts?tag=${tag.trim(
            " "
          )}&sortBy=${sortBy}&direction=${direction}`
        );
        // Removes duplicate results
        return response.data.posts.filter((post) => {
          const duplicate = duplicates.has(post.id);
          duplicates.add(post.id);
          return !duplicate;
        });
      })
    )

    // Flatten result
    posts = posts.flat()

    // Sort the posts arr
    posts.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));

    // If direction is descending, return reverse posts arr
    if (direction === "desc") {
      posts = posts.reverse()
    }

    res.json({ posts });
  } catch (error) {
    res.json({ posts: [] });
  }
});
