import React from 'react';
import '../styling/styles.css'; 
import Navbar from "../components/navbar";
import InputRound from '../components/inputRound';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import NewRoundCourseInfo from '../components/newRoundCourseData';



const NewFullRound = () => {

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

      <div className='new-round-content-container'>
        <div className='new-round-course-info'>
          <NewRoundCourseInfo/>
        </div>
      
        <div className='new-round-entry-container'>
          {/* Handicap Trend */}
          <InputRound/>
        </div>

      </div>

      
    </div>
  );
};

export default NewFullRound;