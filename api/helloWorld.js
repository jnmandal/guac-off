'use strict';

const express = require('express');
const sequelize = require('../config/db.js');

const app = express();

app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

module.exports = app;
