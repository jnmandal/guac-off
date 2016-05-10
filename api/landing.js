'use strict';

module.exports = function (app) {
  // app.get('/', function (req, res) {
  //   res.set('Content-Type', 'text/html');
  //   res.render('index', {email: null});
  // });
  //
  // app.get('/raters/:email', function(req, res) {
  //   res.set('Content-Type', 'text/html');
  //   res.render('index', {email:  req.params.email});
  // })

  app.get('/', function (req, res) {
    res.set('Content-Type', 'text/html');
    res.sendfile('./views/results.html');
  });
}
