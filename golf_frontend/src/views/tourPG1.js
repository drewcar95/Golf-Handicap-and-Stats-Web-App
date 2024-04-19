import React from 'react';
import { useEffect } from "react";
import '../styling/styles.css'; 
import Navbar from "../components/navbar";
import chooseRound from "../images/Choose-Round-Upload.png";
import fullRound from "../images/Full-Round.png";
import roundSummary from "../images/Round-Summary.png"


const TourPage1 = () => {

    useEffect(() => {
        // Check if the user is authenticated when the component mounts
        if (localStorage.getItem('access_token') === null) {
        } 
    }, []);

    return (
      <>
        <Navbar />
        <div className="tour-page-container">
          <div className="tour-page">
            <h1>Posting a Round</h1>
            <p>
              Here is where you will choose what course you played and what type
              of round you want to record. A quick round covers your total score
              and any notes you might have from the round! Super simple. The
              detailed round covers your scoring and stats on every hole including
              putts, fairways and greens in regulation. You choose how you want to
              enter your rounds.
            </p>
            <div className="image-container">
              <img
                src={chooseRound}
                alt="Profile"
                className="round-image"
              />
            </div>
  
            <div className="explanation-container">
              <div>
                <h2>See Full Round details below.</h2>
                <div className="image-container">
                  <img src={fullRound} alt="Profile" className="round-image" />
                </div>
              </div>
              <div>
                <h2>See Round Summary details below.</h2>
                <div className="image-container">
                  <img
                    src={roundSummary}
                    alt="Profile"
                    className="round-summary-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default TourPage1;