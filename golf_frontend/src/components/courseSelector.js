import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../components/api';

export default function CourseSelector() {
  const [courseData, setCourseData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/courses/list_courses/`);
        const jsonData = await response.json();
        setCourseData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedCourse(selectedOption);
  };

  const uploadFullRoundPage = () => {
    // Check if a course is selected
    if (!selectedCourse) {
      console.error('No course selected!');
      return;
    }
    navigate(`/post-full-round/${selectedCourse.id}`);
  };
  const uploadQuickRoundPage = () => {
    // Check if a course is selected
    if (!selectedCourse) {
      console.error('No course selected!');
      return;
    }
    navigate(`/post-round-summary/${selectedCourse.id}`);
  };

  return (
    <div style={{ justifyContent: 'center', minWidth: '200px', height: '70vh' }}>
      <h1>Choose Course and Tee Color!</h1>
      <Select
        className="basic-single"
        classNamePrefix="select"
        value={selectedCourse}
        isMulti={false}
        onChange={handleChange}
        options={courseData}
        getOptionLabel={(option) => `${option.course_name} - Tee Color: ${option.course_tee_color}`}
        getOptionValue={(option) => option.id}
      />

      <Box sx={{ padding: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ alignSelf: 'flex-end', height: 60 }}>
            <Button
              variant="contained"
              sx={{ width: 200 }}
              style={{
                textTransform: 'none',
                backgroundColor: '#006400',
                border: '2px solid black',
                height: 54,
                marginLeft: 20,
                marginTop:30,
              }}
              onClick={uploadFullRoundPage}
            >
              Post Full Round
            </Button>
          </div>
        </div>
      </Box>
      <Box sx={{ padding: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ alignSelf: 'flex-end', height: 60 }}>
            <Button
              variant="contained"
              sx={{ width: 200 }}
              style={{
                textTransform: 'none',
                backgroundColor: '#006400',
                border: '2px solid black',
                height: 54,
                marginLeft: 270,
                marginTop: -91,
              }}
              onClick={uploadQuickRoundPage}
            >
              Post Round Summary
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}