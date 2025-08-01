import React, { useState } from 'react';
import axios from 'axios';

function UploadCSV() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a CSV file.');
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', file);

    try {
      const res = await axios.post('http://localhost:3001/tasks/upload-tasks', formData);
      setMessage(res.data.message || 'Upload successful!');
    } catch (err) {
      console.error(err);
      setMessage('Error uploading file. Make sure agents are registered and the file is in correct format.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload Tasks CSV</h2>
      <form onSubmit={handleUpload}>
        <div className="mb-3">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default UploadCSV;
