import React from 'react';
import Navbar from "../components/navbar";
import '../styles/HomePage.css'; 
import Rounds from '../components/rounds';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

function Stats() {
  const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated when the component mounts
        if (localStorage.getItem('access_token') === null) {
        navigate('/login')
        } 
    }, [navigate]);
  const uploadRoundPage = () => {
      navigate('/select-course');
    }

return (
  <>
    <Navbar/>
      <Box sx={{ padding: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ alignSelf: "flex-end", height: 60 }}>
              <Button
                variant="contained"
                sx={{ width: 200 }}
                style={{
                  textTransform: "none",
                  backgroundColor: "#006400", 
                  border: "2px solid black", 
                  height: 54,
                }}
                onClick={uploadRoundPage}
              >
                Upload a New Round!
              </Button>
            </div>
          </div>
        </Box>

      <Divider
        variant="middle"
        style={{ color: "#006400", borderColor: "solid black" }}
      />
      <div className = 'view-rounds-container' >
        <Rounds style={{ color: "black"}}/>  
      </div>
      
      </>
    )
}
  
  export default Stats;
  