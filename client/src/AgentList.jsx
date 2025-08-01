import { useEffect, useState } from "react";
import axios from "axios";

function AgentList() {
  const [agents, setAgents] = useState([]);
  const [editingAgent, setEditingAgent] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await axios.get("http://localhost:3001/agents");
      setAgents(res.data);
    } catch (err) {
      console.error("Error fetching agents:", err);
    }
  };

  const handleEditClick = (agent) => {
    setEditingAgent({ ...agent });
    setShowEditForm(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingAgent((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/agents/${editingAgent._id}`, editingAgent);
      alert("Agent updated successfully");
      setShowEditForm(false);
      fetchAgents();
    } catch (err) {
      console.error("Error updating agent:", err);
      alert("Failed to update agent");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      try {
        await axios.delete(`http://localhost:3001/agents/${id}`);
        alert("Agent deleted successfully");
        fetchAgents();
      } catch (err) {
        console.error("Error deleting agent:", err);
        alert("Failed to delete agent");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Agent List</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent._id}>
              <td>{agent.name}</td>
              <td>{agent.email}</td>
              <td>{agent.mobile}</td>
              <td>
                <button onClick={() => handleEditClick(agent)}>Edit</button>
                <button
                  onClick={() => handleDelete(agent._id)}
                  style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditForm && editingAgent && (
        <form onSubmit={handleUpdate} style={{ marginTop: "20px" }}>
          <h3>Edit Agent</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editingAgent.name}
            onChange={handleEditChange}
            required
          /><br /><br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={editingAgent.email}
            onChange={handleEditChange}
            required
          /><br /><br />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={editingAgent.mobile}
            onChange={handleEditChange}
            required
          /><br /><br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={editingAgent.password}
            onChange={handleEditChange}
            required
          /><br /><br />
          <button type="submit">Update Agent</button>
          <button type="button" onClick={() => setShowEditForm(false)} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default AgentList;
