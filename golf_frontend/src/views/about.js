// components/HomePage.js
import React from 'react';
import { useState, useEffect} from "react";
import Navbar from "../components/navbar";
import Box from "@mui/material/Box";
import '../styles/HomePage.css'; 
import { API_ENDPOINT } from "../components/api";
import profile from "../images/profile.jpeg";
import swing from "../images/Golf-Swing.mp4";


function About() {

  const [linkedinLink, setLinkedinLink] = useState("Not entered yet");
  const [githubLink, setGithubLink] = useState("Not entered yet");


  useEffect(() => {
      fetch(`${API_ENDPOINT}/api/profile-info/`)
          .then((response) => response.json())
          .then((data) => {

            setLinkedinLink(data.linkedin_link || "Add Github");
            setGithubLink(data.github_link || "Add Github Link");

          })
          .catch((error) => console.error(error));
        
      },); 

      return (
        <>
          <Navbar />
          <div className="home-page-container">
            <div className="home-page">
              <Box
                sx={{
                  marginTop: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={profile}
                  alt="Profile"
                  style={{
                    border: '2px solid black',
                    maxWidth: "60%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <h1>Welcome to Tee Time Analytics!</h1>
              <p>
                Greetings! I'm Andrew, the mind behind this golf stats
                web-application. I am an aspiring software developer with a love
                for sports and after years of playing and watching golf on tv, I
                always wanted to know what my career golf stats were. After
                graduating from New York University with my Masters Degree in
                Computer Science, I decided it was a good time to put my new skills
                to use and build Tee Time Analytics.
              </p>
              <p>
                Tee Time Analytics is a user-friendly platform that simplifies
                handicap management and statistics tracking for golfers of all
                levels. Just enter your scores and we will handle the rest. Checkout
                the website tour to see how you can use the app to keep track of
                your game. Enjoy the application and hit `em straight!
              </p>
              <p>
                If you would like to learn more about my background or resume, please
                see my linkedin and the open source code to this project at my
                github!
              </p>
              <a href={linkedinLink} target="_blank" rel="noopener noreferrer">LinkedIn</a><br/>
              <a href={githubLink} target="_blank" rel="noopener noreferrer">Github</a>
              
              <p>Also, check out my golf swing below!</p>
            </div>
          </div>
          <div>
            <Box
              sx={{
                marginTop: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <video
                controls
                width="100%"
                style={{
                  border: '2px solid black',
                  maxWidth: "600px",
                  height: "auto",
                  objectFit: "cover",
                }}
              >
                <source src={swing} type="video/mp4" />
              </video>
            </Box>
          </div>
        </>
      );
    }
    
    export default About;
