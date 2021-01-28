// backend/routes/api/session.js
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Profile } = require("../../db/models");
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

router.post(
  "/:id",
  asyncHandler(async (req, res, next) => {
    console.log("`````````````````````", req.file.filename);
    const profileImageUrl = await singlePublicFileUpload(req.file);
    return res.json({});
  })
);

module.exports = router;
