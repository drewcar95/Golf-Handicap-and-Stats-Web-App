import React, { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from 'axios'; 
import { API_ENDPOINT } from "../components/api";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useParams, useNavigate } from 'react-router-dom';

function InputRoundSummary() {
    const { course_id } = useParams();
    const user = localStorage.getItem('username');
    const userID = localStorage.getItem('user_id');
    const [courseData, setCourseData] = useState([]);
    const [roundNotes, setRoundNotes] = useState([]);
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [totalScore, setTotalScore] = useState([]);
    const navigate = useNavigate();

 
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`${API_ENDPOINT}/courses/get_course/${course_id}/`);
            const jsonData = await response.json();
            setCourseData(jsonData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
    
        fetchData();
        }, [course_id]);

    const course_rating = courseData.course_rating
    const course_slope = courseData.course_slope
    const handleSubmit = async (e) => {
        e.preventDefault();
      
    try {
      const round_differential = totalScore - course_rating * 113 / course_slope
      const response = await axios.post(`https://teetimeanalytics-backend-django.com/golfRounds/post-round/${user}`, {
        user: userID,
        golf_course: courseData.id,
        date_time_played: selectedDateTime.toISOString(),

        round_notes: roundNotes,
        total_score: totalScore,
        total_holes: 18,
        round_differential: round_differential,

      });
  
      console.log('Round Summary Saved:', response.data);
  
      // Redirect the user to the login page or perform other actions
      // Example: navigate('/login');
    } catch (error) {
      // Handle registration error
      console.error('Error Saving Round:', error);
      // Display an error message to the user
    }
    navigate("/view-rounds")
  };

  return (
    <>
        <Box maxWidth={400} margin="0 auto">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="totalScore"
                        label="Total Score"
                        name="totalScore"
                        autoComplete="Total Score"
                        value={totalScore} // Use the state variable
                        onChange={(e) => setTotalScore(e.target.value)} // Update the state variable
                    />
                    </Grid>

                    <Grid item xs={10}>
                        <TextField
                        required
                        fullWidth
                        id="round_notes"
                        label="Round Notes"
                        name="round_notes"
                        autoComplete="round_notes"
                        value={roundNotes} // Use the state variable
                        onChange={(e) => setRoundNotes(e.target.value)} // Update the state variable
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                        label="Date and Time Played"
                        value={selectedDateTime}
                        onChange={(newValue) => setSelectedDateTime(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>
                    </Grid>
                    
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Post Round Summary
                </Button>
            </form>
      </Box>
    </>
  );
}

export default InputRoundSummary;
