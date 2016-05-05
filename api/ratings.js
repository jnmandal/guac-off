'use strict';
const DB = require('../models/index');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize')

const jsonParser = bodyParser.json();

module.exports = function (app) {
  app.get('/ratings', function (req, res) {
    res.set('Content-Type', 'application/json');
    DB.rating.findAll().then(ratings => {
        res.send(ratings);
    });
  });
  app.post('/ratings', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    DB.user.findOrCreate({ where: {email: req.body.email}, attributes: ['id'] }).spread((user, created) => {
      DB.guacamole.findAll({ where: ["id = ?", req.body.guacamoleId]
      }).then((guac) => {
        const data = {};
        const tags = [];
        req.body.fields.forEach((field) => {
          if (field.key === 'tags') {
            if (!!field.choices) {
              field.choices.forEach((choice) => {
                if (choice.checked) {
                  tags.push(choice.value);
                }
              });
            }
          }
          if (field.key === 'rating') data.value = field.value;
          if (field.key === 'name') data.name = field.value;
          if (field.key === 'comments') data.comments = field.value;
        });
        data.email = req.body.email;
        data.guactID = req.body.guacamoleId;
        DB.rating.create({
          email: req.body.email,
          user_id: user.get('id'),
          name: data.name,
          ratable_id: req.body.guacamoleId,
          value: parseInt(data.value),
          comments: data.comments,
          tags: JSON.stringify(tags)
        }).then(function(rating) {
          res.json(rating);
        });
      });
    });
  });
}
