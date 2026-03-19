const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/moviesController");

router.get("/", moviesController.index);

router.get('/:id', moviesController.show);

router.post("/:id/reviews", moviesController.storeReview);

module.exports = router;