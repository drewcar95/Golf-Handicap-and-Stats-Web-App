import React from 'react';
import '../styling/styles.css'; 


const FullRoundExplanation = () => {
  
    
  
    return (
      <div>
        {/* Golfer Name */}
        <h2 style={{ textAlign: 'center' }}>Full Round Details</h2>
        <p className="divider"></p>
  
        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat">
            <p>Logging a detailed round includes scoring and putts per hole as well as whether you hit the fairway or Green in Regulation. This data will reflect in your profile under the stats section.  </p>
            
          </div>
        </div>
      </div>
    );
  };
  
  export default FullRoundExplanation;