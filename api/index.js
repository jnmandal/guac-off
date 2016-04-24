'use strict';

const express   = require('express');
const fs        = require('fs');
const path      = require('path');

let app = express();

fs.readdirSync(__dirname)
  .filter(file => {
    return  (file.indexOf('.') !== 0)                 &&
            (file !== path.basename(module.filename)) &&
            (file.slice(-3) === '.js');
  }).forEach(file => {
    require(path.join(__dirname, file))(app);
  })

module.exports = app;
