// src/components/Statistics.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import * as XLSX from 'xlsx';
import '../styles/statistics.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function Statistics() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // Load files from localStorage on component mount
  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    setFiles(savedFiles);
  }, []);

  // Save files to localStorage
  const saveFilesToLocalStorage = (files) => {
    localStorage.setItem('uploadedFiles', JSON.stringify(files));
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        setError('Please upload a valid Excel file (.xlsx).');
        setChartData(null); // Clear previous chart data
        return;
      }

      setError(''); // Clear previous errors
      setLoading(true); // Show loading state
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const binaryString = e.target.result;
          const workbook = XLSX.read(binaryString, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);

          if (json.length === 0) {
            setError('The selected Excel file is empty or does not contain valid data.');
            setChartData(null);
            setLoading(false); // Hide loading state
            return;
          }

          // Extract labels and data from the JSON
          const labels = json.map(row => row.Date || 'Unknown');
          const values = json.map(row => row.Value || 0);

          const newFile = {
            name: file.name,
            date: new Date().toISOString(),
            data: {
              labels,
              datasets: [
                {
                  label: 'Data',
                  data: values,
                  fill: false,
                  borderColor: '#007bff',
                  tension: 0.1,
                },
              ],
            },
          };

          // Update state and localStorage
          const updatedFiles = [...files, newFile];
          setFiles(updatedFiles);
          saveFilesToLocalStorage(updatedFiles);
          setChartData(newFile.data);
          setLoading(false); // Hide loading state
        } catch (error) {
          setError('Error processing the Excel file.');
          setChartData(null);
          setLoading(false); // Hide loading state
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  // Handle file delete
  const handleDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    saveFilesToLocalStorage(updatedFiles);
    setChartData(null);
  };

  // Handle file select
  const handleSelect = (index) => {
    setChartData(files[index].data);
  };

  return (
    <div className="statistics-container">
      <h2>Statistics</h2>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {chartData && !error && (
        <div className="chart-container">
          <Line data={chartData} />
        </div>
      )}
      <div className="file-list">
        <h3>Uploaded Files</h3>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <span>{file.name} - {new Date(file.date).toLocaleDateString()}</span>
              <button onClick={() => handleSelect(index)}>View</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Statistics;
