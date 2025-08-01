const fs = require('fs');
const csv = require('csv-parser');
const Agent = require('../models/Agent'); 
const Task = require('../models/Task');   

const uploadTasksFromCSV = async (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      const agents = await Agent.find();
      const totalAgents = agents.length;
      if (totalAgents === 0) {
        return res.status(400).json({ message: 'No agents to assign tasks to.' });
      }

      const tasksToInsert = results.map((task, index) => {
        const assignedAgent = agents[index % totalAgents];
        return {
          title: task.title,
          description: task.description,
          assignedTo: assignedAgent._id,
        };
      });

      await Task.insertMany(tasksToInsert);
      res.status(200).json({ message: 'Tasks uploaded and distributed successfully!' });
    });
};

module.exports = { uploadTasksFromCSV };
