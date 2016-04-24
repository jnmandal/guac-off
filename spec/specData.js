'use strict'
const DB  = require('../models/index');

const guacamoleNames = [
  'I don\'t give a guac',
  'Holy guacamole',
  'Rock out with your guac out',
  'Guacward Silence',
  'Great Green Guac',
  'You have guac to be kidding me'
]

const users = [
  {email: 'john.mandalakas@powerreviews.com', name: 'John Mandalakas'},
  {email: 'ben.taylor@powerreviews.com', name: 'Ben Taylor'},
  {email: 'chuck@powerreviews.com', name: 'Chuck'},
  {email: 'shibe@powerreviews.com', name: 'Shibe'},
  {email: 'tester.mctesterson@powerreviews.com', name: 'Tester McTesterson'},
  {email: 'alexis.zorbas@powerreviews.com', name: 'Zorba'}
]

function createRandomRatings(guac) {
  DB.user.findAll().then(users => {
    for (let i=0; i < 10; i++) {
      let user =users[i % users.length]
      DB.rating.create({
        value: Math.floor((Math.random() * (6 - 1) + 1)),
        comments: 'Lorem Ipsum',
        headline: 'Dolor Amet',
        user_id: user.get('id'),
        ratable_id: guac.get('id')
      });
    }
  });
}


// Create the users
users.forEach((name, i) => {
  DB.user.create({
    email: users[i].email,
    name: users[i].name
  }).then(user => {
    // and their guacamoles
    DB.guacamole.create({
      name: guacamoleNames[i],
      user_id: user.get('id')
    }).then(guac => {
      // Create some ratings for the guacamoles
      createRandomRatings(guac);
    });
  });
});
