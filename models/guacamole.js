'use strict';
module.exports = function(sequelize, DataTypes) {
  var guacamole = sequelize.define('guacamole', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      underscored: true,
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return guacamole;
};
