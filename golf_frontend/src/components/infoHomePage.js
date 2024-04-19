import React from 'react';
import '../styling/styles.css';

const InfoHome = () => {
    
  
    return (
      <div>
        {/* Golfer Name */}
        <h2>Tracking a Handicap</h2>
        <p className="divider"></p>
  
        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat">
            <p className="stat-value">We calculate a golfers handicap based on the USGA Handicap Rule Book. All you need to do is log your
            golf scores to the website and we will continually update our records and calculate the most up to date handicap for you. </p>
            <p>Click below for more information!</p>
          </div>
          </div>
      </div>
    );
  };
  
  export default InfoHome;