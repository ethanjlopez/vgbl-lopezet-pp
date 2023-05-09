const express = require("express");
const {
  getCollection,
  getWishlist,
  getPlaying,
  getPlanned,
  getCompleted,
  getBacklog,
  getDropped,
} = require("../controllers/collectionController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth);

router.get("/", getCollection);

router.get("/wishlist", getWishlist);

router.get("/playing", getPlaying);

router.get("/completed", getCompleted);

router.get("/backlog", getBacklog);

router.get("/dropped", getDropped);

router.get("/planned", getPlanned);

module.exports = router;
