// HandicapTrend.js
import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from "../components/api";
import { Line } from 'react-chartjs-2';
import '../styling/styles.css'; 
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);


const HandicapTrend = () => {
  const [updates, setUpdates] = useState([]);
  const user = localStorage.getItem('username');

  useEffect(() => {

    const apiUrl = `${API_ENDPOINT}/api/get_handicap/${user}/`; 

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {

        setUpdates(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user]); 

  const formattedDates = updates.map((update) =>
    new Date(update.date_time_update).toLocaleDateString()
  );
  const handicaps = updates.map((update) => update.handicap_value);

  const data = {
    labels: formattedDates,
    datasets: [
      {
        label: 'Handicap Trend',
        data: handicaps,
        fill: false,
        borderColor: 'rgba(0, 150, 0, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      scales: {
        x: {
          type: 'category',
          title: {
            display: true,
            text: 'Date',
            fontSize: 14,
          },
        },
        y: {
          title: {
            display: true,
            text: 'Handicap',
            fontSize: 14,
          },
        },
      },
    },
  };


  return (
    <div className="graph-container">
      <h2 className="graph-title">Handicap Trend over Last 10</h2>
        <Line data={data} options={options} />
    </div>
  );
};

export default HandicapTrend;