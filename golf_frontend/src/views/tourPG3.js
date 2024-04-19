import React from 'react';
import { useEffect } from "react";
import '../styling/styles.css'; 
import Navbar from "../components/navbar";
import profileImage from "../images/Profile-Page.png";



const TourPage3 = () => {

    useEffect(() => {
        // Check if the user is authenticated when the component mounts
        if (localStorage.getItem('access_token') === null) {
        } 
    }, []);

    return (
      <>
        <Navbar />
        
        <div className="view-round-page-container">
          <div className="view-round-page">
            <h1>Profile Page</h1>
              <p>
                All statistics will end up here after each round is posted. See how your handicap and scoring changes over time will seeing your career stats and round highlights.  
              </p>
              <div className='view-round-image-container'>
                <img src={profileImage} alt="Profile" className="view-round-image" />
              </div>
            </div>
          </div>
      </>
    );
  };
export default TourPage3;