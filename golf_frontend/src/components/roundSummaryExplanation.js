
import React from 'react';
import '../styling/styles.css'; 

const RoundSummaryExplanation = () => {
  
    
  
    return (
      <div>
        {/* Golfer Name */}
        <h2 style={{ textAlign: 'center' }}>Round Summary Details</h2>
        <p className="divider"></p>
  
        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat">
            <p className="stat-value"> This is the fastest way to log a round! Just enter your gross total score (highest score being double par on any given hole) and we will handle the rest! Round summaries do not affect your profile stats data.</p>
            
          </div>
        </div>
      </div>
    );
  };
  
  export default RoundSummaryExplanation;