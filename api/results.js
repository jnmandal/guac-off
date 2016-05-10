'use strict';
const DB = require('../models/index');

module.exports = function (app) {
  app.get('/results', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'application/json');
    DB.rating
      .findAll()
      .then(ratings => {
        let results = {}
        ratings
          .forEach(rating => {
            const dipId = rating.get('guacamole_id')
            if (results[dipId]) results[dipId].push(rating)
            else results[dipId] = [rating]
          })
        results = Object.keys(results).map(i => results[i]);

        return results
          .map(results => {
            let average = Math.round(100*(results
              .map(result => result.value)
              .reduce((a, b) => a + b)) / results.length) / 100;

            return {
              id: results[0].get('guacamole_id'),
              average,
              count: results.length
            };
          });
      })
      .then(results => {
        res.send(results)
      })
  })
}
