import React from 'react';
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Pagination from "@mui/material/Pagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import '../styles/HomePage.css'; 
import { API_ENDPOINT } from "../components/api";
import { Link } from 'react-router-dom';

function Rounds() {
  const [data, setData] = useState([]);
  const user = localStorage.getItem('username');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const rowsPerPage = 10;

  const handlePageChange = (event, value) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setPage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/golfRounds/list-rounds/${user}/`);
        const jsonData = await response.json();
        setData(jsonData);
        setTotalPage(Math.ceil(jsonData.length / rowsPerPage)); // Calculate total pages after fetching data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, [user]);

  // Calculate the index of the first and last items to display on the current page
  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 , color: "#006400"}}>
          Golf Rounds
        </Typography>
      </Box>
    
      <Box sx={{ padding: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Course</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Tee</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Holes</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Score</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">View Round</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.map((round) => (
                <TableRow key={round.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row" style={{ width: "5vw" }}>
                    {round.course_name}
                  </TableCell>
                  <TableCell component="th" scope="row" style={{ width: "5vw" }}>
                    {round.tee_color}
                  </TableCell>
                  <TableCell>
                    {round.holes}
                  </TableCell>
                  <TableCell>
                    {round.score}
                  </TableCell>
                  <TableCell>
                    <Link to={`/view-round/${round.id}/${round.course_id}`}>
                      <Typography variant="h6">View Round</Typography>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            marginTop: 15,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination
            count={totalPage}
            page={page}
            variant="outlined"
            onChange={handlePageChange}
            style={{ margin: "0 auto" }}
          />
        </div>
      </Box>
    </>
  );
}

export default Rounds;