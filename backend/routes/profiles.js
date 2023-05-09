const express = require("express");
const {
  setPlaying,
  setPlanned,
  setCompleted,
  setBacklog,
  setDropped,
  setWishlist,
  getStatus,
  deleteGame,
  setMulti,
} = require("../controllers/profileController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth);

router.get("/:gameID", getStatus);
router.delete("/", deleteGame);
router.post("/playing", setPlaying);
router.post("/planned", setPlanned);
router.post("/completed", setCompleted);
router.post("/backlog", setBacklog);
router.post("/dropped", setDropped);
router.post("/wishlist", setWishlist);
router.post("/multi", setMulti);

module.exports = router;
