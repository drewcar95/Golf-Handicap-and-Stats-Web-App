import React from 'react';
import '../styling/styles.css'; 
import Navbar from "../components/navbar";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import InputRoundSummary from '../components/inputRoundSummary';
import NewRoundCourseInfo from '../components/newRoundCourseData';



const PostQuickRound = () => {

  const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated when the component mounts
        if (localStorage.getItem('access_token') === null) {
        navigate('/login')
        } 
    }, [navigate]);


    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Navbar />
  
        <div className='summary-container'>
          <div className='summary-course-info'>
            <NewRoundCourseInfo />
          </div>
  
          <div className='post-round-summary'>
            <InputRoundSummary />
          </div>
        </div>
      </div>
    );
  };
  
  export default PostQuickRound;