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
    required: false,
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
        value: 'Savory'
      },
      {
        value: 'Sweet'
      }
    ]
  }
]

module.exports = function (app) {
  app.get('/ryd', (request, response) => {
    const email = request.query.email;
    if (!email) {
      response.status(403)
      response.send({
        error: 'email required'
      })
    }

    response.set('Content-Type', 'application/json');
    response.set('Access-Control-Allow-Origin', '*');
    DB.user
      .findOrCreate({
        where: {email}
      })
      .spread((user, created) => user.getRatedGuacamoles())
      .then(ratedGuacs => {
        DB.guacamole
          .findAll()
          .then(allGuacamoles => {
            let unrated;
            // if the user has rated any guacs... filter them out
            if (ratedGuacs.length > 0) {
              unrated = allGuacamoles.filter(guac => {
                return !ratedGuacs
                  .map(ratedGuac => ratedGuac.get('id') === guac.get('id'))
                  .reduce((a,b) => a || b)
              })
            } else {
              // otherwise all guacamoles are unrated
              unrated = allGuacamoles;
            }

            let dips = unrated.map(dip => {
                return {
                    product_information: {
                      name: dip.name,
                      page_id: dip.id
                    },
                  review_template: reviewTemplate,
                  order_information: {order_date: Date.now()}
                }
            })
            response.send({
              merchant_information: {},
              localizations: localizations,
              purchaser_information: {email},
              purchases: dips
            });
          });
      })


  });

}
