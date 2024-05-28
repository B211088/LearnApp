const express = require("express");
const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// @route GET api/register
// @desc Checks if the user is logged in
// @access Public

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/register
// @desc Đăng ký người dùng
// @access Public
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });
  }

  try {
    const user = await User.findOne({ username });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Username already" });
    }

    const hashPassword = await argon2.hash(password); // Sửa: Thêm 'await'

    const newUser = new User({
      username,
      password: hashPassword,
    });

    await newUser.save();

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res
      .status(201)
      .json({ success: true, message: "Register success", accessToken });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/login
// @desc Đăng nhập người dùng
// @access Public

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username or password" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password or username" });
    }

    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password or password" });
    }
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res
      .status(201)
      .json({ success: true, message: "Login success", accessToken });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
