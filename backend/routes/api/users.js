// backend/routes/api/users.js
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const asyncHandler = require("express-async-handler");
const { User } = require("../../db/models");
const express = require("express");
const router = express.Router();

// Sign up
router.post(
  "",
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

module.exports = router;
