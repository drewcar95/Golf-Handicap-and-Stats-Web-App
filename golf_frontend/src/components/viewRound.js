import * as React from 'react';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { API_ENDPOINT } from "../components/api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ViewRound() {
  const { roundId, course_id } = useParams();
  const [data, setData] = useState([]);
  const [holeData, setHoleData] = useState([]);
  const navigate = useNavigate();
 
  const user = localStorage.getItem('username')
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/golfRounds/get-round/${user}/${roundId}`);
        const jsonData = await response.json();
        setData(jsonData);

        const hole_data = await fetch(`${API_ENDPOINT}/courses/get_specific_holes/${jsonData.course_id}`)
        const hole_jsonData = await hole_data.json();

        setHoleData(hole_jsonData)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
    }, [user, roundId]);


    const handleDeleteRound = async () => {
      try {
        await fetch(`${API_ENDPOINT}/golfRounds/delete-round/${user}/${roundId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        navigate("/");
      } catch (error) {
        console.error('Error deleting round:', error);
      }
    };

    const EditRoundPage = (roundId) => {
        navigate(`/edit-round/${roundId}/${course_id}`);
    };

    const rows = holeData.map((hole) => ({
      holeNumber: hole.holeID,
      parValue: hole.par_value,
      score: data[`hole${hole.holeID}_score`] || 'Not Entered',
      putts: data[`hole${hole.holeID}_Putts`] || 'Not Entered',
      gir: data[`hole${hole.holeID}_GIR`] === 1 ? 'Yes' : data[`hole${hole.hole_number}_GIR`] === 0 ? 'No' : 'No',
      fwy: data[`hole${hole.holeID}_FWY`] === 1 ? 'Yes' : data[`hole${hole.hole_number}_FWY`] === 0 ? 'No' : 'No',
    }));

    console.log(data[`hole1_GIR`]);

    const TimePlayed = new Date(data.date_time_played).toLocaleDateString();
    const TotalScore = (data.total_score)
    const roundNotes = (data.round_notes)
    const totalPutts = (data.total_putts)
    const totalFWY = (data.total_fwy)
    const totalGIR = (data.total_gir)


  return (
    <>
      <Box sx={{ padding: 2 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>

          <Button
            variant="contained"
            sx={{ width: 200 }}
            style={{
              textTransform: "none",
              backgroundColor: "red", 
              border: "2px solid black", 
              height: 54,
            }}
            onClick={handleDeleteRound}
          >
            Delete this round
          </Button>
          
          {/* Second Button */}
          <Button
            variant="contained"
            sx={{ width: 200 }}
            style={{
              textTransform: "none",
              backgroundColor: "black", 
              border: "2px solid black", 
              height: 54,
            }}
            onClick={() => EditRoundPage(roundId)}
          >
            Edit This Round
          </Button>
        </div>
      </Box>
      {!isNaN(parseFloat(data.hole1_score)) ? (

        <div style={{ textAlign: 'center' }}>
                {/* Golfer Name */}
                <h2 style={{ textAlign: 'center' }}>Round Details</h2>
                {/* Stats Section Container */}
                <div className="round-stats-container"  style={{ maxHeight: '300px', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
                  <div className="round-stats-section">
                    <div className="round-stat">
                      <p className="round-stat-label">Time Played</p>
                      <p className="round-stat-value">{TimePlayed} </p>
                    </div>
                  </div>
            
                  <div className="round-stats-section">
                    <div className="round-stat">
                      <p className="round-stat-label">Total Score</p>
                      <p className="round-stat-value">{TotalScore} </p>
                    </div>
                  </div>
                  <div className="round-stats-section">
                    <div className="round-stat">
                      <p className="round-stat-label">Total Putts</p>
                      <p className="round-stat-value">{totalPutts}</p>
                    </div>
                  </div>
            
                  <div className="round-stats-section">
                    <div className="round-stat">
                      <p className="round-stat-label">Total Fairways</p>
                      <p className="round-stat-value">{totalFWY} </p>
                    </div>
                  </div>
            
                  <div className="round-stats-section">
                    <div className="round-stat">
                      <p className="round-stat-label">Total GIRs</p>
                      <p className="round-stat-value">{totalGIR} </p>
                    </div>
                  </div>
                  
                </div>
                <div className="round-stats-section">
                    <div className="round-stat">
                      <p className="round-stat-label">Round Notes</p>
                      <p className="round-stat-value">{roundNotes}</p>
                    </div>
                  </div>
              </div>
      ):(
        <div style={{ textAlign: 'center' }}>
                {/* Golfer Name */}
            <h2 style={{ textAlign: 'center' }}>Round Details</h2>
                {/* Stats Section Container */}
                <div className="round-stats-container"  style={{ maxHeight: '300px', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                  <div className="round-stats-section">
                    <div className="round-stat">
                      <p className="round-stat-label">Time Played</p>
                      <p className="round-stat-value">{TimePlayed} </p>
                    </div>
                  </div>
            
                  <div className="round-stats-section">
                    <div className="round-stat">
                      <p className="round-stat-label">Total Score</p>
                      <p className="round-stat-value">{TotalScore} </p>
                    </div>
                  </div>
                </div>
                <div className="round-stats-section">
                  <div className="round-stat">
                    <p className="round-stat-label">Round Notes</p>
                    <p className="round-stat-value">{roundNotes}</p>
                  </div>
                </div>

            </div>

      )}

      <Divider
        variant="middle"
        style={{ color: "#006400", borderColor: "solid black" }}
      />
  
      {!isNaN(parseFloat(data.hole1_score)) && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Hole Number</StyledTableCell>
                <StyledTableCell>Par Value</StyledTableCell>
                <StyledTableCell align="right">Score</StyledTableCell>
                <StyledTableCell align="right">Putts</StyledTableCell>
                <StyledTableCell align="right">GIR</StyledTableCell>
                <StyledTableCell align="right">Fairway</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.holeNumber}>
                  <StyledTableCell component="th" scope="row">
                    {row.holeNumber}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.parValue}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.score}</StyledTableCell>
                  <StyledTableCell align="right">{row.putts}</StyledTableCell>
                  <StyledTableCell align="right">{row.gir}</StyledTableCell>
                  <StyledTableCell align="right">{row.fwy}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}