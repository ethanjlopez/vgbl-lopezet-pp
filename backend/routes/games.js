const express = require("express");
const {
  getGames,
  fetchNext,
  getGame,
  queryGame,
  fetchPlatforms,
  // getAgeRatings,
  // createGame,
  // deleteGame,
  // updateGame,
} = require("../controllers/IGDBController");

const router = express.Router();

// READ *, FETCH 50
router.get("/", getGames);
// READ *, FETCH 50
router.get("/fetch/:position?", fetchNext);

router.route("/id/:id").get(getGame);

router.get("/platforms", fetchPlatforms);

module.exports = router;
