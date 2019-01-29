const db = require("../models");
const axios = require("axios");
var env = require('dotenv').load();

// Defining methods for the articlesController
module.exports = {
  populate: function (req, res) {
    axios.get(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${process.env.API_KEY}`)
      .then(({ data: { results } }) => res.json(results))
      .catch(err => res.status(422).json(err));
  },


  findAll: function (req, res) {
    db.Articles
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Articles
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Articles
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Articles
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Articles
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
