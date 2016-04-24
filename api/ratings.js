'use strict';
const DB = require('../models/index');

module.exports = function (app) {
  app.get('/ratings', function (req, res) {
    res.set('Content-Type', 'application/json');
    DB.rating.findAll().then(ratings => {
        res.send(ratings);
    });
  });
}
