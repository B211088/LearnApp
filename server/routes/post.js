const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const verifyToken = require("../middleware/auth");

// @route GET api/post
// @desc Create post
// @access Private

router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    return res.json({ success: true, posts });
  } catch (error) {
    console.error("Error saving post:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/post
// @desc Create post
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `http://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });

    await newPost.save();
    res.json({
      success: true,
      message: "Create Post successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error saving post:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// @route PUT api/post
// @desc Update post
// @access Private

router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const updatePost = {
      title,
      description: description || "",
      url: url.startsWith("https://") ? url : `http://${url}`,
      status: status || "TO LEARN",
    };

    const postUpdateCondition = { _id: req.params.id, user: req.userId };

    const updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, {
      new: true,
    });

    // User not authorized to update post
    if (!updatedPost) {
      return res
        .status(401)
        .json({ success: false, message: "User not authorized to update post" });
    }

    res.json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Error updating post:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});


router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = {_id: req.params.id, user: req.userId}
    const deletePost = await Post.findOneAndDelete(postDeleteCondition)
  
    // user not authorized to delete 
    if (!deletePost) {
      return res
        .status(401)
        .json({ success: false, message: "User not authorized to delete post" });
    }
  
    res.json({
      success: true,
      message: "Post delete successfully",
      post: deletePost,
    });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
