import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import axios from 'axios';
import { API_ENDPOINT } from "../components/api";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useParams, useNavigate } from 'react-router-dom';


// STYLES //

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
    '&.holeColumn': {
      backgroundColor: '#4CAF50', 
      color: 'white', 
    },
  }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableContainer = styled(TableContainer)({
  maxWidth: '600px', 
  margin: '20px auto',
});

const StyledTextField = styled(TextField)({
  width: '100%',
});





export default function InputRound() {
    const { course_id } = useParams();

    // Set the state state of row Data //
    const [formRows, setFormRows] = useState(Array.from({ length: 18 }, () => ({
      hole_score: '',
      hole_Putts: null,
      hole_GIR: false,
      hole_FWY: false,
    })));

    const navigate = useNavigate();
    

    // Handle changes to row data
    const handleInputChange = (index, columnName, value) => {
      const newFormRows = [...formRows];
      if (columnName === 'hole_GIR' || columnName === 'hole_FWY') {
        newFormRows[index][columnName] = value;
      } else {
        newFormRows[index][`hole_${columnName}`] = value;
      }
      setFormRows(newFormRows);
    };

    // Initialize some values
    const [open, setOpen] = React.useState(false);
    const user = localStorage.getItem('username')
    const userID = localStorage.getItem('user_id')
    const [courseData, setCourseData] = useState([])
    const [roundNotes, setRoundNotes] = useState([])
    const [selectedDateTime, setSelectedDateTime] = useState(null);


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
        // Calculate total_gir, total_putts, total_score, total_holes
        const total_gir = formRows.reduce((total, row) => total + (row.hole_GIR ? 1 : 0), 0);
        const total_fwy = formRows.reduce((total, row) => total + (row.hole_FWY ? 1: 0), 0);
        const total_putts = formRows.reduce((total, row) => total + Number(row.hole_Putts || 0), 0);
        const total_score = formRows.reduce((total, row) => total + Number(row.hole_score || 0), 0);
        const total_holes = formRows.length;
        const round_differential = total_score - course_rating * 113 / course_slope
        console.log(formRows[8].hole_GIR)
        const response = await axios.post(`https://teetimeanalytics-backend-django.com/golfRounds/post-round/${user}`, {
          user: userID,
          golf_course: courseData.id,
          date_time_played: selectedDateTime.toISOString(),
          hole1_score: formRows[0].hole_score,
          hole2_score: formRows[1].hole_score,
          hole3_score: formRows[2].hole_score,
          hole4_score: formRows[3].hole_score,
          hole5_score: formRows[4].hole_score,
          hole6_score: formRows[5].hole_score,
          hole7_score: formRows[6].hole_score,
          hole8_score: formRows[7].hole_score,
          hole9_score: formRows[8].hole_score,
          hole10_score: formRows[9].hole_score,
          hole11_score: formRows[10].hole_score,
          hole12_score: formRows[11].hole_score,
          hole13_score: formRows[12].hole_score,
          hole14_score: formRows[13].hole_score,
          hole15_score: formRows[14].hole_score,
          hole16_score: formRows[15].hole_score,
          hole17_score: formRows[16].hole_score,
          hole18_score: formRows[17].hole_score,

          hole1_Putts: formRows[0].hole_Putts,
          hole2_Putts: formRows[1].hole_Putts,
          hole3_Putts: formRows[2].hole_Putts,
          hole4_Putts: formRows[3].hole_Putts,
          hole5_Putts: formRows[4].hole_Putts,
          hole6_Putts: formRows[5].hole_Putts,
          hole7_Putts: formRows[6].hole_Putts,
          hole8_Putts: formRows[7].hole_Putts,
          hole9_Putts: formRows[8].hole_Putts,
          hole10_Putts: formRows[9].hole_Putts,
          hole11_Putts: formRows[10].hole_Putts,
          hole12_Putts: formRows[11].hole_Putts,
          hole13_Putts: formRows[12].hole_Putts,
          hole14_Putts: formRows[13].hole_Putts,
          hole15_Putts: formRows[14].hole_Putts,
          hole16_Putts: formRows[15].hole_Putts,
          hole17_Putts: formRows[16].hole_Putts,
          hole18_Putts: formRows[17].hole_Putts,
          
          hole1_GIR: formRows[0].hole_GIR,
          hole2_GIR: formRows[1].hole_GIR,
          hole3_GIR: formRows[2].hole_GIR,
          hole4_GIR: formRows[3].hole_GIR,
          hole5_GIR: formRows[4].hole_GIR,
          hole6_GIR: formRows[5].hole_GIR,
          hole7_GIR: formRows[6].hole_GIR,
          hole8_GIR: formRows[7].hole_GIR,
          hole9_GIR: formRows[8].hole_GIR,
          hole10_GIR: formRows[9].hole_GIR,
          hole11_GIR: formRows[10].hole_GIR,
          hole12_GIR: formRows[11].hole_GIR,
          hole13_GIR: formRows[12].hole_GIR,
          hole14_GIR: formRows[13].hole_GIR,
          hole15_GIR: formRows[14].hole_GIR,
          hole16_GIR: formRows[15].hole_GIR,
          hole17_GIR: formRows[16].hole_GIR,
          hole18_GIR: formRows[17].hole_GIR,

          hole1_FWY: formRows[0].hole_FWY,
          hole2_FWY: formRows[1].hole_FWY,
          hole3_FWY: formRows[2].hole_FWY,
          hole4_FWY: formRows[3].hole_FWY,
          hole5_FWY: formRows[4].hole_FWY,
          hole6_FWY: formRows[5].hole_FWY,
          hole7_FWY: formRows[6].hole_FWY,
          hole8_FWY: formRows[7].hole_FWY,
          hole9_FWY: formRows[8].hole_FWY,
          hole10_FWY: formRows[9].hole_FWY,
          hole11_FWY: formRows[10].hole_FWY,
          hole12_FWY: formRows[11].hole_FWY,
          hole13_FWY: formRows[12].hole_FWY,
          hole14_FWY: formRows[13].hole_FWY,
          hole15_FWY: formRows[14].hole_FWY,
          hole16_FWY: formRows[15].hole_FWY,
          hole17_FWY: formRows[16].hole_FWY,
          hole18_FWY: formRows[17].hole_FWY,

          round_notes: roundNotes,
          total_gir,
          total_fwy,
          total_putts,
          total_score,
          total_holes,
          round_differential,

        });
    
        // Registration was successful, show success message
        setOpen(true);
        console.log('Registration successful:', response.data);
    
        // Redirect the user to the login page or perform other actions
        // Example: navigate('/login');
      } catch (error) {
        // Handle registration error
        console.error('Registration error:', error);
        // Display an error message to the user
      }
      navigate("/view-rounds")
    };
  
    const renderTable = (startIndex, endIndex) => (
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Hole Number</StyledTableCell>
              <StyledTableCell align="center">Score</StyledTableCell>
              <StyledTableCell align="center">Putts</StyledTableCell>
              <StyledTableCell align="center">Fairways</StyledTableCell>
              <StyledTableCell align="center">GIR</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formRows.slice(startIndex, endIndex).map((row, index) => (
              <StyledTableRow key={index + startIndex}>
                <StyledTableCell className="holeColumn" component="th" scope="row">
                    Hole {index + startIndex + 1}
                </StyledTableCell>
                <StyledTableCell align="right">
                <StyledTextField
                  value={row.hole_score}
                  onChange={(e) => handleInputChange(index + startIndex, 'score', e.target.value)}
                />
                </StyledTableCell>
                <StyledTableCell align="right">
                <StyledTextField
                  value={row.hole_Putts}
                  onChange={(e) => handleInputChange(index + startIndex, 'Putts', e.target.value)}
                />
                </StyledTableCell>
                <StyledTableCell align="right">
                  {/* Replace the TextField with Checkbox */}
                  <Checkbox
                    checked={row.hole_FWY}
                    onChange={(e) => handleInputChange(index + startIndex, 'FWY', e.target.checked)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  {/* Replace the TextField with Checkbox */}
                  <Checkbox
                    checked={row.hole_GIR}
                    onChange={(e) => handleInputChange(index + startIndex, 'GIR', e.target.checked)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    );
  
    return (
      
      <Box maxWidth={1200} margin="0 auto">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={5}>
              {renderTable(0, 9)}
            </Grid>
            <Grid item xs={5}>
              {renderTable(9, 18)}
            </Grid>
          </Grid>
          <Grid container spacing={3}>
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
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Post Round
          </Button>
        </form>
      </Box>
    );
  }