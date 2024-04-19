// components/HomePage.js
import React from 'react';
import { useState, useEffect} from "react";
import Navbar from "../components/navbar";
import '../styles/HomePage.css'; 
import InfoHome from '../components/infoHomePage';
import PostRoundInfo from '../components/postRoundInfo';
import DataInfo from '../components/dataInfo';
import logo from "../images/golf-logo.jpg";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    } else {
      setIsAuth(false); // Ensure that isAuth is false if no token is found
    }
  }, []);
  const user = localStorage.getItem('username')
  const navigate = useNavigate();

  const navPostRound = () => {
    navigate("/select-course");
  };
  const aboutHandicap = () => {
    navigate("/about-handicap");
  };
  const aboutProfile = () => {
    navigate("/profile");
  };


  return (
    <>
      <Navbar />
      {isAuth ?(
        <>
          <div className="home-page-container">
            <div className="home-page">
              <img
                src={logo}
                width="300px"
                height="300px"
                style={{ padding: "5px", borderRadius: "50%", borderColor: 'black' }}
                alt="Logo"
                />
              <h1>Welcome {user}!</h1>
              <p>
                Review your previous Rounds, View Stats or Post a New Round.
              </p>
            </div>
          </div>
          <div className="home-container">
            <div className='info-home-card'>
              <div>
              <InfoHome/>
              </div>
              <div className='button-container'>
                <Button
                    variant="contained"
                    sx={{ width: 200 }}
                    style={{
                      textTransform: "none",
                      backgroundColor: "#006400", 
                      border: "2px solid black", 
                      height: 54,
                      
                    }}
                    onClick={aboutHandicap}
                  >
                    About Handicap
                  </Button>
              </div>
            </div>
            <div className='post-round-info-card'>
              <PostRoundInfo/>
              <div className="button-container">
              <Button
                variant="contained"
                sx={{ width: 200 }}
                style={{
                  textTransform: "none",
                  backgroundColor: "#006400", 
                  border: "2px solid black", 
                  height: 54,
                  marginTop: 'auto'
                  
                }}
                onClick={navPostRound}
              >
                Post a Round
              </Button>
              </div>
              
            </div>
            <div className='data-info-card'>
              <DataInfo/>
              <div className='button-container'>
                <Button
                variant="contained"
                sx={{ width: 200 }}
                style={{
                  textTransform: "none",
                  backgroundColor: "#006400", 
                  border: "2px solid black", 
                  height: 54,
                  
                }}
                onClick={aboutProfile}
              >
                View Profile
              </Button>
                
              </div>
            </div>
          </div>
          


        </>
      
        ):
        <>
          <div className="home-page-container">
            <div className="home-page">
              <img
                  src={logo}
                  width="300px"
                  height="300px"
                  style={{ padding: "5px", borderRadius: "50%", borderColor: 'black' }}
                  alt="Logo"
                  />
              <h1>Welcome to Tee Time Analytics!</h1>
              <p>
                This website is a place for you to keep track of
                your entire golf game. Tee Time Analytics is the one stop shop for all of your golf analytics. 
              </p>
              <p>
                On this app, we track all of your rounds, update your handicap, keep track of how many putts and greens in regulation you hit and much more. 
              </p>
              <p>
                Sign up today to get started on your way to being a better golfer and having more fun on the course!
              </p>
            </div>
            
          </div>

          <div className="home-container">
            <div className='info-home-card'>
              <div>
                <InfoHome/>
              </div>
              <div className='button-container'>
                <Button
                    variant="contained"
                    sx={{ width: 200 }}
                    style={{
                      textTransform: "none",
                      backgroundColor: "#006400", 
                      border: "2px solid black", 
                      height: 54,
                      
                    }}
                    onClick={aboutHandicap}
                  >
                    About Handicap
                  </Button>
              </div>
            </div>
            <div className='post-round-info-card'>
              <div>
                <PostRoundInfo/>
              </div>
              <div className="button-container">
              <Button
                variant="contained"
                sx={{ width: 200 }}
                style={{
                  textTransform: "none",
                  backgroundColor: "#006400", 
                  border: "2px solid black", 
                  height: 54,
                  marginTop: 'auto'
                  
                }}
                onClick={navPostRound}
              >
                Post a Round
              </Button>
              </div>

            </div>
            <div className='data-info-card'>
              <div>
                <DataInfo/>
              </div>
              <div className='button-container'>
                <Button
                variant="contained"
                sx={{ width: 200 }}
                style={{
                  textTransform: "none",
                  backgroundColor: "#006400", 
                  border: "2px solid black", 
                  height: 54,
                  
                }}
                onClick={aboutProfile}
              >
                View Profile
              </Button>
                
              </div>
            </div>
          </div>
        </>}
    </>
  );
}

export default HomePage;
