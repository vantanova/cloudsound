// backend/routes/api/session.js
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { Song } = require("../../db/models");
const { use } = require("./session");

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const homeFiles = await Song.findAll();

    console.log(homeFiles);

    return res.json({
      homeFiles,
    });
  })
);

module.exports = router;
