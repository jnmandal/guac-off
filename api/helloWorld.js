'use strict';

const express = require('express');
const sequelize = require('../models/index.js');

const app = express();

app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

module.exports = app;
