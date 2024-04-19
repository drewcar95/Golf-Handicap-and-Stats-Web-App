import React from 'react';
import '../styling/styles.css'; 
import Navbar from "../components/navbar";
import CourseSelector from '../components/courseSelector';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import RoundSummaryExplanation from '../components/roundSummaryExplanation';
import FullRoundExplanation from '../components/fullRoundExplanation';

const ChooseCourse = () => {

    const navigate = useNavigate();

    useEffect(() => {
          // Check if the user is authenticated when the component mounts
        if (localStorage.getItem('access_token') === null) {
        navigate('/login')
        } 
    }, [navigate]);


    return (
      <div>
        <Navbar />
        <div className='choose-round'>
          <div className='select-course-container'>
            <CourseSelector/>
          </div>
          <div className='explanation-container'>
            <div className='full-round-explained'>
              <FullRoundExplanation/>
            </div>
            <div className='round-summary-explained'>
              <RoundSummaryExplanation/>
            </div>
          </div>
          <p> Only 18 Hole Rounds are permitted to be posted at this time.</p>
        </div>
      </div>
    );
  };
  
  export default ChooseCourse;