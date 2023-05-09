// login user
const express = require("express");
// This file separates the logic from the router files
const mongoose = require("mongoose");
// This package creates web tokens for authorized users and to communicate with the server based on this token
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const Profile = require("../models/profileModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  //create a token
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);

    const profile = new Profile({ user: user._id });
    profile.save();

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
