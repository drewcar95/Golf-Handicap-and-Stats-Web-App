// components/HomePage.js
import React from 'react';
import Navbar from "../components/navbar";
import '../styles/HomePage.css'; 


function AboutHandicap() {
  
  return (
    <>
      <Navbar />
        <div className="home-page-container">
          <div className="home-page">
            <h1>Understanding Handicap Calculations</h1>
            <p>
              A golfer's handicap is a numerical measure of their playing ability, allowing players of differing skill levels to compete on an equal footing. Calculating a handicap involves several factors and follows a standardized process set forth by governing bodies such as the USGA (United States Golf Association).
            
            </p>
            <p>
              The calculation typically begins with a golfer's scoring differentials, which are the difference between their scores and the course rating, adjusted for slope rating. The course rating represents the expected score for a scratch golfer, while the slope rating reflects the relative difficulty of the course for a bogey golfer compared to a scratch golfer.
            </p>
            <p>
              To compute the scoring differentials, a golfer's adjusted gross scores from recent rounds are used, factoring in any applicable ESC (Equitable Stroke Control) adjustments to cap the maximum score per hole for handicap purposes.
                            
            </p>
            
            <p>
              Once the scoring differentials are determined, the best differentials (usually the lowest) from a specified number of rounds are selected. These selected differentials are then averaged, with adjustments made for the number of rounds used and any additional handicap factors such as abnormal course or weather conditions.
            </p>
            <p>
              The resulting average differential is multiplied by a constant factor (usually 0.96) to calculate the golfer's handicap index. This index represents the player's potential ability on any course and serves as the foundation for determining their course handicap, which is specific to the course being played and ensures fair competition across different venues.
            </p>
            <p>
              In essence, a golfer's handicap is a dynamic reflection of their recent performance, providing a fair and equitable basis for competition regardless of skill level or course difficulty. It not only adds a layer of excitement to the game but also fosters camaraderie and sportsmanship among players of all abilities.
            </p>
            
            {/* Add more content as needed */}
          </div>
        </div>
    </>
  );
}

export default AboutHandicap;
