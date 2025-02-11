const express = require("express");
const router = express.Router();

const SalesAgent = require("../models/salesAgent.model");

// post a agent
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name && !email) {
      res.status(400).json({ error: "Invalid input: all fields is required." });
    }
    const newAgent = await SalesAgent.create({ name, email });
    res.status(201).json({ message: "Saved Data Successfully", newAgent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get all agents
router.get("/", async (req, res) => {
  try {
    const agents = await SalesAgent.find();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
