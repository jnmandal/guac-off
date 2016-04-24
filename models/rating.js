'use strict';
module.exports = function(sequelize, DataTypes) {
  var Rating = sequelize.define('rating', {
    value: DataTypes.INTEGER,
    comments: DataTypes.TEXT,
    headline: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    guacamole_id: DataTypes.INTEGER
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Rating.belongsTo(models.user);
        Rating.belongsTo(models.guacamole, {
          foreignKey: 'ratable_id'
        });
      }
    }
  });
  return Rating;
};
