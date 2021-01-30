// backend/routes/api/session.js
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Song } = require("../../db/models");
const { use } = require("./session");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");

router.post(
  "/",
  singleMulterUpload("image"),
  asyncHandler(async (req, res, next) => {
    const userProfileId = parseInt(req.params.id);
    console.log("```````", req.body);
    console.log("`````````````````````", req.file);
    // const profileImageUrl = await singlePublicFileUpload(req.file);
    // const song = await Song.create({
    //   image: "default",
    //   headerImage: "default",
    //   bio: "default",
    //   userId: user.id,
    // });
    // return res.json({ song });
  })
);

module.exports = router;
