"use strict";
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "Profile",
    {
      profilePicture: DataTypes.STRING,
      headerImage: DataTypes.STRING,
      bio: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      commentId: DataTypes.INTEGER,
    },
    {}
  );
  Profile.associate = function (models) {
    Profile.belongsTo(models.User, { foreignKey: "userId" });
    Profile.hasMany(models.Song, { foreignKey: "profileId" });
  };
  return Profile;
};
