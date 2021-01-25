// backend/routes/api/session.js
const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Profile } = require("../../db/models");
const { use } = require("./session");

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const userId = parseInt(req.params.id);
    const userFiles = await User.findAll({
      where: { id: userId },
      include: [{ model: Profile }],
    });

    console.log(userFiles);

    return res.json({
      userFiles,
    });
  })
);

module.exports = router;
