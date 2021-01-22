// backend/routes/index.js
const express = require("express");
const router = express.Router();

router.get("/hello/world", function (req, res) {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.send("Hello World!");
});

// GET /api/set-token-cookie
const asyncHandler = require("express-async-handler");
const { setTokenCookie } = require("../utils/auth");
const { User } = require("../db/models");
router.get(
  "/set-token-cookie",
  asyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: {
        username: "Demo-lition",
      },
    });
    setTokenCookie(res, user);
    return res.json({ user });
  })
);

module.exports = router;

// API routes
const apiRouter = require("./api");

router.use("/api", apiRouter);
