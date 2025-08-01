const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadTasksFromCSV } = require('../controllers/taskController');
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "your_jwt_secret_key";



const upload = multer({ dest: 'uploads/' });

router.get('/agents', async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
// get tasks - agents get their task
router.get('/my-tasks', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Admin can see tasks alloted
router.get('/agent-tasks', async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/upload-tasks', upload.single('csvFile'), uploadTasksFromCSV);

module.exports = router;
