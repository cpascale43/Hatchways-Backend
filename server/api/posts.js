const router = require("express").Router();
module.exports = router;
let posts = require("../data");

router.get("/", async (req, res, next) => {
  try {
    let { tags, sortBy, direction } = req.query;
    const validSortBy = ["id", "reads", "likes", "popularity"];
    const validDirection = ["asc", "desc"];

    // return errors for missing or invalid parameters
    if (!tags) {
      return res.status(400).json({ error: "Tags parameter is required" });
    }

    if (!validSortBy.includes(sortBy.toLowerCase())) {
      return res.status(400).json({ error: "sortBy parameter is invalid" });
    }

    if (!validDirection.includes(direction.toLowerCase())) {
      return res.status(400).json({ error: "direction parameter is invalid" });
    }

    res.json(posts);
  } catch (err) {
    next(err);
  }
});
