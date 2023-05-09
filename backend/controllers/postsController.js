const Game = require("../models/gameModel");

const getStatus = async (req, res) => {
  const { gameID } = req.params;
  try {
    const doc = await Game.findOne({
      user: req.user,
      gameID: gameID,
    });
    if (doc) {
      console.log(doc);
      res.status(200).send(doc);
    } else {
      res.status(200).json({ status: null });
    }
  } catch (error) {
    console.error("err:", error);
    res.status(400).json({ error: error.message });
  }
};

const deleteGame = async (req, res) => {
  const { gameID } = req.body;
  try {
    const filter = { user: req.user, gameID: gameID };
    const doc = await Game.findOneAndDelete(filter);
    console.log(doc);
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const setPlaying = async (req, res) => {
  const { gameID, data } = req.body;
  try {
    const filter = { gameID: gameID, userID: req.user, data: data };
    const update = { status: "Playing" };
    const doc = await Game.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
    if (doc) {
      res.status(200).json({ msg: "success" });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const setPlanned = async (req, res) => {
  const { gameID, data } = req.body;
  try {
    const filter = { gameID: gameID, userID: req.user, data: data };
    const update = { status: "Planned" };
    const doc = await Game.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
    if (doc) {
      res.status(200).json({ msg: "success" });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const setCompleted = async (req, res) => {
  const { gameID, data } = req.body;
  try {
    const filter = { gameID: gameID, userID: req.user, data: data };
    const update = { status: "Completed" };
    const doc = await Game.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
    if (doc) {
      res.status(200).json({ msg: "success" });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const setBacklog = async (req, res) => {
  const { gameID, data } = req.body;
  try {
    const filter = { gameID: gameID, userID: req.user, data: data };
    const update = { status: "Backlog" };
    const doc = await Game.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
    if (doc) {
      res.status(200).json({ msg: "success" });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const setDropped = async (req, res) => {
  const { gameID, data } = req.body;
  try {
    const filter = { gameID: gameID, userID: req.user, data: data };
    const update = { status: "Dropped" };
    const doc = await Game.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
    if (doc) {
      res.status(200).json({ msg: "success" });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const setWishlist = async (req, res) => {
  const { gameID, data } = req.body;
  try {
    const filter = { gameID: gameID, userID: req.user, data: data };
    const update = { status: "Wishlist" };
    const doc = await Game.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    });
    if (doc) {
      res.status(200).json({ msg: "success" });
    } else {
      throw error;
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  setPlaying,
  setPlanned,
  setCompleted,
  setBacklog,
  setDropped,
  setWishlist,
  getStatus,
  deleteGame,
};
