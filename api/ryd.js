'use strict';
const DB = require('../models/index');
const localizations = require('../localizations/ryd.json');

const reviewTemplate = [
  // stars
  {
    field_type: 'simple',
    key: 'rating',
    label: 'Rating',
    required: true,
    input_type: 'Stars'
  },
  // free text
  {
    field_type: 'simple',
    key: 'comments',
    label: 'Thoughts',
    required: true,
    helper_text: 'Any comments on the dip? What worked? What didn\'t?',
    input_type: 'TextArea'
  },
  // tags
  {
    field_type: 'collection',
    key: 'tags',
    label: 'Tags',
    required: false,
    input_type: 'CheckboxVertical',
    choices: [
      {
        value: 'Spicy'
      },
      {
        value: 'Cheesy'
      },
      {
        value: 'Dry'
      }
    ]
  }
]

module.exports = function (app) {
  // endpoint requires a reviewer email!
  app.get('/ryd', (request, response) => {
    response.set('Content-Type', 'application/json');
    response.set('Access-Control-Allow-Origin', '*');
    DB.guacamole
      .findAll()
      .then(guacamoles => {
        let dips = guacamoles.map(dip => {
            return {
              product_information: {name: dip.name},
              review_template: reviewTemplate,
              order_information: {order_date: Date.now()}
            }
        })
        response.send({
          merchant_information: {},
          localizations: localizations,
          purchaser_information: {name: 'Alexis Zorbas', email: 'zorbas@dalkas.gr'},
          purchases: dips
        });
      });
  });

}
