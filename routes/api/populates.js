const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

// Polulate the articles
router.route("/")
  .get(articlesController.populate);

module.exports = router;
