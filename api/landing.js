'use strict';

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.set('Content-Type', 'text/html');
    res.sendfile('./views/index.html');
  });

  app.get('/results', function (req, res) {
    res.set('Content-Type', 'text/html');
    res.sendfile('./views/results.html');
  });
}
