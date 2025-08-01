const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const PlayerModel = require("./models/Player");
const AgentModel = require("./models/Agent");
const Task = require("./models/Task");

const agentRoutes = require("./routes/agentRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/player");

const JWT_SECRET = "your_jwt_secret_key";

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ error: "Token missing" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

// Register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await PlayerModel.findOne({ email });
    if (existingUser) return res.json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await PlayerModel.create({ name, email, password: hashedPassword });

    res.json({ message: "User registered", user: newUser });
  } catch (err) {
    res.status(500).json({ error: "Registration error" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await PlayerModel.findOne({ email });
  if (!user) return res.json({ error: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.json({ error: "Incorrect password" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

  res.json({ message: "Login successful", token, user });
});

app.get("/profile", verifyToken, async (req, res) => {
  const user = await PlayerModel.findById(req.userId);
  res.json(user);
});

// Add Agent
app.post("/add-agent", (req, res) => {
  AgentModel.create(req.body)
    .then(agent => res.json({ message: "Agent added successfully", agent }))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Get All Agents
app.get("/agents", async (req, res) => {
  try {
    const agents = await AgentModel.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Agent
app.delete("/agents/:id", async (req, res) => {
  try {
    await AgentModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Agent deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Agent
app.put("/agents/:id", async (req, res) => {
  try {
    const updatedAgent = await AgentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAgent) return res.status(404).json({ message: "Agent not found" });
    res.json(updatedAgent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CSV Upload and Task Distributed
const upload = multer({ dest: "uploads/" });

app.post("/upload-tasks", upload.single("file"), async (req, res) => {
  try {
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        const agents = await AgentModel.find();
        if (agents.length === 0) return res.status(400).json("No agents available");

        let index = 0;
        for (const task of results) {
          await Task.create({
            taskName: task.taskName,
            description: task.description,
            assignedTo: agents[index % agents.length]._id,
          });
          index++;
        }

        fs.unlinkSync(req.file.path); 
        res.json("Tasks uploaded and assigned successfully");
      });
  } catch (err) {
    console.error(err);
    res.status(500).json("Failed to upload tasks");
  }
});

app.use("/agents", agentRoutes);
app.use("/tasks", taskRoutes);

app.listen(3001, () => {
  console.log("server is running");
});
