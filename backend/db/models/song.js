"use strict";
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define(
    "Song",
    {
      image: DataTypes.STRING,
      audio: DataTypes.STRING,
      title: DataTypes.STRING,
      profileId: DataTypes.INTEGER,
    },
    {}
  );
  Song.associate = function (models) {
    Song.belongsTo(models.Profile, { foreignKey: "profileId" });
    Song.hasMany(models.Comment, { foreignKey: "songId" });
  };
  return Song;
};
