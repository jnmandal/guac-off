'use strict';
module.exports = function(sequelize, DataTypes) {
  var Guacamole = sequelize.define('guacamole', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Guacamole.belongsTo(models.user);
        Guacamole.hasMany(models.rating, {
          foreignKey: 'ratable_id'
        });
      }
    }
  });
  return Guacamole;
};
