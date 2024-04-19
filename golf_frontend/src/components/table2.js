import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import '../styling/styles.css'; 
import CardContent from '@mui/material/CardContent';


function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.courseName}
        </TableCell>
        <TableCell>{row.score}</TableCell>
        <TableCell>{row.putts}</TableCell>
        <TableCell>{row.fairways}</TableCell>
        <TableCell>{row.gir}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Hole 1</TableCell>
                    <TableCell>Hole 2</TableCell>
                    <TableCell>Hole 3</TableCell>
                    <TableCell>Hole 4</TableCell>
                    <TableCell>Hole 5</TableCell>
                    <TableCell>Hole 6</TableCell>
                    <TableCell>Hole 7</TableCell>
                    <TableCell>Hole 8</TableCell>
                    <TableCell>Hole 9</TableCell>
                    <TableCell>Out</TableCell>
                    <TableCell>Hole 10</TableCell>
                    <TableCell>Hole 11</TableCell>
                    <TableCell>Hole 12</TableCell>
                    <TableCell>Hole 13</TableCell>
                    <TableCell>Hole 14</TableCell>
                    <TableCell>Hole 15</TableCell>
                    <TableCell>Hole 16</TableCell>
                    <TableCell>Hole 17</TableCell>
                    <TableCell>Hole 18</TableCell>
                    <TableCell>Hole In</TableCell>  
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.par * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const CollapsibleTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('https://your-django-backend/api/courses') 
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  return (
    <div>
      <CardContent>
        <TableContainer component={Paper} sx={{ width: '100%', margin: '0 auto', border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
          <h2 className="graph-title">Posted Rounds</h2>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Course Name</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Putts</TableCell>
                <TableCell>Fairways Hit</TableCell>
                <TableCell>GIR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.courseName} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </div>
  );
};

export default CollapsibleTable;

