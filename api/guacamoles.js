'use strict';
const DB = require('../models/index');

module.exports = function (app) {
  app.get('/guacamoles', function (req, res) {
    res.set('Content-Type', 'application/json');
    DB.guacamole.findAll().then(ratings => {
        res.send(ratings);
    });
  });
}
