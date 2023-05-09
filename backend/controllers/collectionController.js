const axios = require("axios");
const Profile = require("../models/profileModel");
const Game = require("../models/gameModel");

const getCollection = async (req, res) => {
  try {
    const doc = await Game.find({
      status: { $ne: "Wishlist" },
      userID: req.user,
    });
    // sort({ "data.0.name": "asc" });
    if (doc) {
      res.status(200).send(doc);
    } else {
      res.status(200).json({ status: null });
    }
  } catch (error) {
    console.error("err:", error);
    res.status(400).json({ error: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const doc = await Game.find({
      status: "Wishlist",
      userID: req.user,
    });
    if (doc) {
      res.status(200).send(doc);
    } else {
      res.status(200).json({ status: null });
    }
  } catch (error) {
    console.error("err:", error);
    res.status(400).json({ error: error.message });
  }
};

const getPlaying = async (req, res) => {
  try {
    const doc = await Game.find({
      status: "Playing",
      userID: req.user,
    });
    if (doc) {
      res.status(200).send(doc);
    } else {
      res.status(200).json({ status: null });
    }
  } catch (error) {
    console.error("err:", error);
    res.status(400).json({ error: error.message });
  }
};

const getPlanned = async (req, res) => {
  try {
    const doc = await Game.find({
      status: "Planned",
      userID: req.user,
    });
    if (doc) {
      res.status(200).send(doc);
    } else {
      res.status(200).json({ status: null });
    }
  } catch (error) {
    console.error("err:", error);
    res.status(400).json({ error: error.message });
  }
};

const getCompleted = async (req, res) => {
  try {
    const doc = await Game.find({
      status: "Completed",
      userID: req.user,
    });
    if (doc) {
      res.status(200).send(doc);
    } else {
      res.status(200).json({ status: null });
    }
  } catch (error) {
    console.error("err:", error);
    res.status(400).json({ error: error.message });
  }
};

const getBacklog = async (req, res) => {
  try {
    const doc = await Game.find({
      status: "Backlog",
      userID: req.user,
    });
    if (doc) {
      res.status(200).send(doc);
    } else {
      res.status(200).json({ status: null });
    }
  } catch (error) {
    console.error("err:", error);
    res.status(400).json({ error: error.message });
  }
};

const getDropped = async (req, res) => {
  try {
    const doc = await Game.find({
      status: "Dropped",
      userID: req.user,
    });
    if (doc) {
      res.status(200).send(doc);
    } else {
      res.status(200).json({ status: null });
    }
  } catch (error) {
    console.error("err:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCollection,
  getWishlist,
  getPlaying,
  getPlanned,
  getCompleted,
  getBacklog,
  getDropped,
};
