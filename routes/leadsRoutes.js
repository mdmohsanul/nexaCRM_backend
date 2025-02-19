const express = require("express");
const router = express.Router();
const Lead = require("../models/lead.model");
const SalesAgent = require("../models/salesAgent.model");

// post a lead
router.post("/", async (req, res) => {
  try {
    const { name, source, status, timeToClose, priority, salesAgent, tags } =
      req.body;

    if (!name || !status || !timeToClose || !priority || !source || !tags) {
      res.status(400).json({ error: "Invalid input: all fields is required." });
    }
    const findAgents = await SalesAgent.find();

    const checkSalesAgent = findAgents.find(
      (item) => item._id.toString() === salesAgent
    );
    if (!checkSalesAgent) {
      res.status(404).json({
        error: `Sales agent with ID ${salesAgent} not found.`,
      });
    }
    const newLead = await Lead.create({
      name,
      source,
      status,
      timeToClose,
      priority,
      salesAgent,
      tags,
    });
    res.status(201).json({ message: "Saved Data Successfully", newLead });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get all leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().populate("salesAgent");
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//update a lead
router.put("/:id", async (req, res) => {
  try {
    const leadId = req.params.id;
    const leads = await Lead.find();
    const checkLeadId = leads.find((item) => item.id.toString() === leadId);
    if (!checkLeadId) {
      res.status(400).json({ error: `Lead with ID ${leadId} not found.` });
    }
    const { name, source, status, timeToClose, priority, salesAgent, tags } =
      req.body;

    if (!name && !status && !timeToClose && !priority && !source && !tags) {
      res.status(400).json({ error: "Invalid input: all fields is required." });
    }
    const updatedLead = await Lead.findByIdAndUpdate(
      leadId,
      { name, source, status, timeToClose, priority, salesAgent, tags },
      { new: true }
    );
    res.status(200).json({ message: "Lead Updated", updatedLead });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete a lead
router.delete("/:id", async (req, res) => {
  try {
    const leadId = req.params.id;
    const leads = await Lead.find();
    const checkLeadId = leads.find((item) => item.id.toString() === leadId);
    if (!checkLeadId) {
      res.status(400).json({ error: `Lead with ID ${leadId} not found.` });
    }
    const deleteLead = await Lead.findByIdAndDelete(leadId);
    res.status(200).json({ message: "Lead Deleted Successfully", deleteLead });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
