'use strict';
module.exports = function(sequelize, DataTypes) {
  var rating = sequelize.define('rating', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    guacamole_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }

    }
  });
  return rating;
};
