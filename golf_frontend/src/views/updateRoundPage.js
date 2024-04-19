import React from 'react';
import '../styling/styles.css'; 
import Navbar from "../components/navbar";
import UpdateRound from '../components/updateRound';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import CourseInfo from '../components/courseInfo';

const UpdateRoundPage = () => {

  const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated when the component mounts
        if (localStorage.getItem('access_token') === null) {
        navigate('/login')
        } 
    }, [navigate]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div className='new-round-content-container'>
        <div className='new-round-course-info'>
          <CourseInfo />
        </div>
        <div className='edit-round-container'>
          <UpdateRound />
        </div>
      </div>
    </div>
  );
};

export default UpdateRoundPage;