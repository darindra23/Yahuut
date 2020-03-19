"use strict";
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Room extends Model {}

  Room.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true
        }
      }
    },
    { sequelize }
  );
  Room.associate = function(models) {
    Room.hasMany(models.User);
  };
  return Room;
};
