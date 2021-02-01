// backend/routes/api/session.js
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Song } = require("../../db/models");
const { use } = require("./session");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");
let title;
let genre;
let user;

router.post(
  "/",
  singleMulterUpload("audio"),
  asyncHandler(async (req, res, next) => {
    const userProfileId = parseInt(req.params.id);
    const profileSongUrl = await singlePublicFileUpload(req.file);
    console.log(profileSongUrl);

    const song = await Song.create({
      image: "default",
      audio: `${profileSongUrl}`,
      title: title,
      genre: genre,
      profileId: user,
    });
    return res.json({ song });
  })
);

router.post(
  "/1",
  asyncHandler(async (req, res, next) => {
    const userProfileId = parseInt(req.params.id);
    genre = req.body.select;
    title = req.body.title;
    user = req.body.userId;
    console.log("```````", user);
  })
);

module.exports = router;
