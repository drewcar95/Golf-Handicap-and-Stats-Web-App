import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from "../components/api";
import { Bar } from 'react-chartjs-2';
import '../styling/styles.css'; // Import your CSS file for styling
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = () => {
  const [rounds, setRounds] = useState([]);
  const user = localStorage.getItem('username');

  useEffect(() => {
    // Define the API endpoint for fetching round data
    const apiUrl = `${API_ENDPOINT}/golfRounds/latest-10-rounds/${user}/`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setRounds(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user]); 

  // Extracting round scores and par values for the chart data
  const roundNumbers = rounds.map((round) => round.score); 
  const pars = rounds.map((round) => round.par_value); 

  // Chart data and options
  const data = {
    labels: rounds.map((round, index) => `Round ${index + 1}`),
    datasets: [
      {
        label: 'Total Score',
        data: roundNumbers,
        backgroundColor: 'rgba(0, 128, 0, 0.6)',
        borderColor: 'rgba(0, 128, 0, 1)',
        borderWidth: 2,
      },
      {
        label: 'Par',
        data: pars,
        backgroundColor: 'rgba(169, 169, 169, 1)',
        borderColor: 'rgba(169, 169, 169, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bar-graph-container">
      <h2 className="graph-title">Last 10 Rounds vs Par</h2>
        <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;