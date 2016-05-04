'use strict';

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.set('Content-Type', 'text/html');
    res.sendfile('./index.html');
  });
}
