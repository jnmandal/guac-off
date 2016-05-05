'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.guacamole);
        User.hasMany(models.rating);
        User.belongsToMany(models.guacamole, {
          as: 'RatedGuacamoles',
          through: {
            model: models.rating
          }
        });
      }
    }
  });
  return User;
};
