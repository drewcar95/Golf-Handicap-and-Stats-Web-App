import React from 'react';
import { useEffect } from "react";
import GolferCard from '../components/playerStatCard'; 
import HandicapTrend from '../components/handicapTrend';
import BarGraph from '../components/barGraph'; 
import Handicap from '../components/handicap'; 
import '../styling/styles.css'; 
import Navbar from "../components/navbar";
import { useNavigate } from 'react-router-dom';
import Latest5Rounds from '../components/latestRounds';
import Top5Rounds from '../components/topRounds';

const Profile = () => {

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
      <div className='profile-container'>
        <div className='profile-left'>
          <div className='handicap-card'>
            <Handicap />
          </div>

          <div className='golfer-card'>
            <GolferCard/>
          </div>
        </div>
        
        <div className='profile-middle'>
          <div className='round-card'>
            {/* Golf Rounds */}
            <Latest5Rounds/>
          </div>
      
          <div className='best-round-card'>
            {/* Golf Rounds */}
            <Top5Rounds/>
          </div>
        </div>
        
        <div className='profile-right'>
          <div>
            <HandicapTrend/>
          </div>

          <div>
            <BarGraph />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;