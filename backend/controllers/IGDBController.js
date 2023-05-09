const express = require("express");
// This file separates the logic from the router files
const mongoose = require("mongoose");
// access to global defaults for axios and requests
const axios = require("axios");
// Browse Page
// Sends a request to IGDB and returns the first 15 games sorted by rating
const getGames = async (req, res) => {
  const fields = "fields name, cover.url, platforms.name, first_release_date;";
  const search = `search "${req.query.query}";`;
  const position = `offset ${req.query.position};`;
  const sort = `sort ${req.query.sort} ${req.query.order};`;
  const limit = `limit ${req.query.limit};`;
  const platform = `platforms.name = "${req.query.platforms}";`;
  let exclude = "where rating != null & cover != null & name != null;";
  let query = fields + limit;

  if (req.query.query && req.query.query !== "") {
    query += search;
  } else if (req.query.sort && req.query.order) {
    query += sort;
  }

  if (req.query.position) {
    query += position;
  }
  if (req.query.platforms) {
    exclude = `where rating != null & cover != null & name != null & ${platform}`;
  }
  query += exclude;
  console.log(query);

  const data = {
    url: "/v4/games",
    method: "POST",
    data: query,
  };

  try {
    axios(data)
      .then((r) => {
        res.status(200).send(r.data);
      })
      .catch((err) => {
        console.error(err);
      });
    // res.json({ test: "test" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Sends a request to IGDB and returns the next 50 games from an offset position
const fetchNext = async (req, res) => {
  const { position } = req.params;

  const fields = "fields name, cover.url, first_release_date, platforms;";
  const search = `search "${req.query.query}";`;
  const offset = `offset ${position};`;
  const sort = `sort ${req.query.sort} ${req.query.order};`;
  const limit = `limit ${req.query.limit};`;
  const platform = `platforms.name = "${req.query.platforms}";`;
  let exclude = "where rating != null & cover != null & name != null;";
  let query = fields + limit;

  if (req.query.sort && req.query.order) {
    query += sort;
  }
  if (req.query.query && req.query.query !== "") {
    query += search;
  }
  if (position) {
    query += offset;
  }
  if (req.query.platforms) {
    exclude = `where rating != null & cover != null & name != null & ${platform}`;
  }
  query += exclude;
  console.log(query);
  const data = {
    url: "/v4/games",
    method: "POST",
    data: query,
  };

  try {
    axios(data)
      .then((r) => {
        res.status(200).send(r.data);
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Returns a SINGLE Game
const getGame = async (req, res, next) => {
  const { id } = req.params;
  const data = {
    url: "/v4/games",
    method: "POST",
    data: `fields name,
    artworks.url,
    age_ratings.rating,
    age_ratings.content_descriptions.description,
    age_ratings.*,
    cover.url,
    game_modes.name,
    genres.name,
    platforms.name,
    platforms.platform_logo.url,
    first_release_date,
    involved_companies.company.name,
    involved_companies.company.url,
    involved_companies.developer,
    involved_companies.publisher,
    rating,
    summary,
    screenshots.url,
    videos.video_id;
    where id = ${id};`,
  };
  try {
    axios(data)
      .then((r) => {
        res.status(200).send(r.data);
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const fetchPlatforms = async (req, res) => {
  const fields = "fields name;";
  const platforms = [
    7, 8, 48, 167, 9, 165, 390, 46, 38, 20, 4, 159, 37, 19, 416, 130, 137, 21,
    18, 33, 22, 24, 11, 12, 49, 169, 6,
  ];
  const condition = `where id = (${platforms});`;
  const limit = `limit ${platforms.length};`;
  const data = fields + condition + limit;
  const query = {
    url: "/v4/platforms",
    method: "POST",
    data: data,
  };
  try {
    if (query) {
      const response = await axios(query);
      res.status(200).json(response.data);
    }
  } catch (error) {
    console.log(response.data);
    console.log(query);
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getGames,
  fetchNext,
  getGame,
  fetchPlatforms,
};
