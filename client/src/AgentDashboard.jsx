import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AgentDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/tasks/agent-tasks')
      .then(res => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const groupedByAgent = tasks.reduce((acc, task) => {
    const agentId = task.assignedTo?._id || 'unassigned';
    const agentName = task.assignedTo?.name || 'Unassigned';
    if (!acc[agentId]) {
      acc[agentId] = { agentName, tasks: [] };
    }
    acc[agentId].tasks.push(task);
    return acc;
  }, {});

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container mt-4">
      {/*Navigation */}
      <nav className="mb-4">
        <h2 className="mb-3">Admin Dashboard</h2>
        <div className="btn-group" role="group">
          <Link to="/add-agent" className="btn btn-outline-primary">Add Agent</Link>
          <Link to="/agents" className="btn btn-outline-primary">Agent List</Link>
          <Link to="/uploadcsv" className="btn btn-outline-primary">Upload CSV</Link>
          <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
        </div>
      </nav>

      {/*Task Distribution */}
      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        Object.entries(groupedByAgent).map(([agentId, agentData]) => (
          <div key={agentId} className="card mb-4">
            <div className="card-header">
              <strong>{agentData.agentName}</strong>
            </div>
            <ul className="list-group list-group-flush">
              {agentData.tasks.map((task, index) => (
                <li key={index} className="list-group-item">
                  <strong>{task.title}</strong>: {task.description}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default AgentDashboard;
