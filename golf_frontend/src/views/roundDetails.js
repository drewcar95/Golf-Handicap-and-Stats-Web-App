import React from 'react';
import '../styling/styles.css'; 
import Navbar from "../components/navbar";
import ViewRound from '../components/viewRound';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import CoursePlayed from '../components/coursePlayed';

const RoundDetails = () => {

    const navigate = useNavigate();
  
      useEffect(() => {
          // Check if the user is authenticated when the component mounts
          if (localStorage.getItem('access_token') === null) {
          navigate('/login')
          } 
      }, [navigate]);
  
    return (
      <div>
        <Navbar/>
        <div className='course-played'>
          <CoursePlayed/>
        </div>
        <div className='view-round-details'>
          <ViewRound/>
        </div>
    
      </div>
    );
  };
  
  export default RoundDetails;