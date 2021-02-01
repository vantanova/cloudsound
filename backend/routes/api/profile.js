// backend/routes/api/session.js
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Profile, Comment } = require("../../db/models");
const { use } = require("./session");
const { singlePublicFileUpload, singleMulterUpload } = require("../../awsS3");

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id);
    const userFiles = await User.findAll({
      where: { id: userId },
      include: [{ model: Profile }],
    });

    return res.json({
      userFiles,
    });
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    console.log("hit");
    const userProfileId = parseInt(req.params.id);
    Profile.update(
      { bio: req.body.text },
      {
        where: {
          userId: userProfileId,
        },
      }
    );
    return res.json({});
  })
);

router.post(
  "/:id",
  singleMulterUpload("image"),
  asyncHandler(async (req, res, next) => {
    const userProfileId = parseInt(req.params.id);
    console.log("`````````````````````", req);
    const profileImageUrl = await singlePublicFileUpload(req.file);
    Profile.update(
      { profilePicture: profileImageUrl },
      {
        where: {
          userId: userProfileId,
        },
      }
    );

    return res.json({ profileImageUrl });
  })
);

module.exports = router;
