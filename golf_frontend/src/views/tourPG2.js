import React from 'react';
import { useEffect } from "react";
import '../styling/styles.css'; 
import Navbar from "../components/navbar";
import viewRound from "../images/View-Round.png";
import roundsImage from "../images/Rounds.png";


const TourPage2 = () => {

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
            <h1>Viewing Round</h1>
            <p>
              All of your rounds can be found on this page. Click on any round to view details.
            </p>
            <div className='view-round-image-container'>
              <img src={roundsImage} alt="Profile" className="view-round-image" />
            </div>
    
            <div className='explanation-container'>
              <div>
                <h2>
                  Viewing Round Details
                </h2>
                <p>
                  Each full will show you your scoring and statistics while a round summary will only show you your total score.
                </p>
                <div className='view-round-image-container'>
                  <img src={viewRound} alt="Profile" className="view-round-image" />
                </div>
              </div>
            </div>
    
          </div>
        </div>
      </>
  );
  };

export default TourPage2;