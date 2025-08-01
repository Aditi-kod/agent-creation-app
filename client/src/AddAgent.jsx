import React, { useState } from 'react';
import axios from 'axios';

function AddAgent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/add-agent', {
      name, email, mobile, password
    })
    .then(res => {
      setMessage(res.data.message);
    })
    .catch(err => {
      setMessage("Failed to add agent: " + err.response?.data?.error || err.message);
    });
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-4 rounded w-25'>
        <h2>Add Agent</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label><strong>Name</strong></label>
            <input type='text' className='form-control' onChange={e => setName(e.target.value)} required />
          </div>
          <div className='mb-3'>
            <label><strong>Email</strong></label>
            <input type='email' className='form-control' onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className='mb-3'>
            <label><strong>Mobile</strong></label>
            <input type='text' className='form-control' placeholder="+91..." onChange={e => setMobile(e.target.value)} required />
          </div>
          <div className='mb-3'>
            <label><strong>Password</strong></label>
            <input type='password' className='form-control' onChange={e => setPassword(e.target.value)} required />
          </div>
          <button className='btn btn-success w-100'>Add Agent</button>
        </form>
        {message && <div className='mt-3 alert alert-info'>{message}</div>}
      </div>
    </div>
  );
}

export default AddAgent;
