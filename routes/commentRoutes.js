const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Lead = require("../models/lead.model");
const SalesAgent = require("../models/salesAgent.model");
const Comment = require("../models/comment.model");

router.post("/:id", async (req, res) => {
  try {
    const lead = req.params.id;
    const { author, commentText } = req.body;
    // Check if the leadId is a valid MongoDB ObjectId and leadId exists in database or not
    if (
      !mongoose.Types.ObjectId.isValid(lead) ||
      !(await Lead.findById(lead))
    ) {
      return res
        .status(400)
        .json({ message: "Invalid ID format or lead not found!" });
    }
    const checkAgentId = await SalesAgent.findOne({ _id: author });
    if (!checkAgentId) {
      return res.status(400).json({ message: "Agent not found!" });
    }
    const newComment = await Comment.create({
      lead,
      author,
      commentText,
    });

    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// get comments for a particular lead

router.get("/:id", async (req, res) => {
  try {
    const leadId = req.params.id;
    // Check if the leadId is a valid MongoDB ObjectId and leadId exists in database or not
    if (
      !mongoose.Types.ObjectId.isValid(leadId) ||
      !(await Lead.findById(leadId))
    ) {
      return res
        .status(400)
        .json({ message: "Invalid ID format or lead not found!" });
    }
    const comments = await Comment.find({ lead: leadId }).populate("author");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
