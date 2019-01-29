const router = require("express").Router();
const articleRoutes = require("./articles");
const populateRoutes = require("./populates");

// Book routes
router.use("/articles", articleRoutes);
router.use("/populate", populateRoutes);

module.exports = router;
