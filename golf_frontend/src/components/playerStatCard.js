import React, { useState, useEffect } from 'react';
import '../styling/styles.css'; 
import { API_ENDPOINT } from "../components/api";





const GolferCard = () => {
  const user = localStorage.getItem('username')

  const [stats, setStats] = useState([])

  useEffect(() => {
    const apiUrl = `${API_ENDPOINT}/api/user-stats/${user}/`; 

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setStats(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user]); 


  const roundedGIRs = stats.gir_per_round?.toFixed(1);
  const roundedPutts = stats.putts_per_round?.toFixed(1);
  const roundedPuttsPerHole = stats.putts_per_hole?.toFixed(1);
  const roundedFairwaysPerRound = stats.fairways_per_round?.toFixed(1);


  return (
    <div>
      {/* Golfer Name */}
      <h2>Stats</h2>
      <p className="divider"></p>

      {/* Stats Section */}
      <div className="golfer-stats-section">
        <div className="golfer-stat">
          <p className="stat-label">AVG Fairways per 18 Holes</p>
          <p className="stat-value">{roundedFairwaysPerRound} </p>
          <p className="divider"></p>
        </div>
      </div>
      <div className="golfer-stats-section">
        <div className="golfer-stat">
          <p className="stat-label">AVG Greens in Regulation per 18 Holes</p>
          <p className="stat-value">{roundedGIRs}</p>
          <p className="divider"></p>
        </div>
      </div>
      <div className="golfer-stats-section">
        <div className="golfer-stat">
          <p className="stat-label">AVG Putts per 18 Holes</p>
          <p className="stat-value">{roundedPutts}</p>
          <p className="divider"></p>
        </div>
      </div>
      <div className="golfer-stats-section">
        <div className="golfer-stat">
          <p className="stat-label">AVG Putts Per Hole</p>
          <p className="stat-value">{roundedPuttsPerHole}</p>
          <p className="divider"></p>
        </div>
      </div>
    </div>
  );
};

export default GolferCard;