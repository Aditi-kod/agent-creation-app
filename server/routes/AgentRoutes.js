const express = require("express");
const router = express.Router();
const Agent = require("../models/Agent");

// GET /agents - fetch all agents
router.get("/", async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch agents" });
  }
});

// Update agents
router.put("/agents/:id", async (req, res) => {
  try {
    const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAgent);
  } catch (err) {
    res.status(500).json({ error: "Failed to update agent" });
  }
});


module.exports = router;
