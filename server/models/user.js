"use strict";
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model {}

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true
        }
      },
      score: DataTypes.INTEGER,
      RoomId: DataTypes.INTEGER
    },
    { sequelize }
  );
  User.associate = function(models) {
    User.belongsTo(models.Room);
  };
  return User;
};
