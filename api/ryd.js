'use strict';
const DB = require('../models/index');

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
    key: 'pros',
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
    DB.guacamole
      .findAll()
      .then(guacamoles => {
        let dips = guacamoles.map(dip => {
            return {
              product_information: {name: dip.name},
              review_template: reviewTemplate
            }
        })
        response.send({
          merchant_information: {},
          localizations: {},
          purchaser_information: {name: 'Alexis Zorbas', email: 'zorbas@dalkas.gr'},
          purchases: dips
        });
      });
  });

}
