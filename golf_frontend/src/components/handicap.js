import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Title from './title';
import '../styling/styles.css'; 
import { API_ENDPOINT } from "../components/api";
import { Link } from 'react-router-dom';


export default function Handicap() {

  const user = localStorage.getItem('username')

  const [data, setData] = useState([])

  useEffect(() => {

    const apiUrl = `${API_ENDPOINT}/api/user-stats/${user}/`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {

        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user]);

  // Round the current_handicap_value to one decimal point
  const roundedHandicap = data.current_handicap_value?.toFixed(1);


  return (
    <div>
        <React.Fragment>
            <Title>Current Handicap {roundedHandicap}</Title>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
              Updated With Last Round
            </Typography>
            <Link to={'/about-handicap'}>
              <Typography variant="h9">About Your Handicap</Typography>
            </Link>
        </React.Fragment>

    </div>
  );
}
