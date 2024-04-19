import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from "../components/api";
import { useParams } from 'react-router-dom';

const CoursePlayed = () => {
    const { roundId, course_id } = useParams();
    const [courseData, setCourseData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${API_ENDPOINT}/courses/get_course/${course_id}/`);
            const jsonData = await response.json();
            // Process jsonData as needed
            setCourseData(jsonData);
    
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
     
        fetchData();
        }, [course_id]);

        return (
          <div style={{ textAlign: 'center' }}>
            {/* Golfer Name */}
            <h2>Course Info</h2>
        
            {/* Stats Section Container */}
            <div className="round-stats-container" style={{ maxHeight: '300px', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px' }}>
              <div className="round-stats-section">
                <div className="round-stat">
                  <p className="round-stat-label">Course Name</p>
                  <p className="round-stat-value">{courseData.course_name}</p>
                </div>
              </div>
        
              <div className="round-stats-section">
                <div className="round-stat">
                  <p className="round-stat-label">Tee Color</p>
                  <p className="round-stat-value">{courseData.course_tee_color}</p>
                </div>
              </div>
        
              <div className="round-stats-section">
                <div className="round-stat">
                  <p className="round-stat-label">Yardage</p>
                  <p className="round-stat-value">{courseData.course_yardage}</p>
                </div>
              </div>
        
              <div className="round-stats-section">
                <div className="round-stat">
                  <p className="round-stat-label">Par Value</p>
                  <p className="round-stat-value">{courseData.par_value}</p>
                </div>
              </div>
        
              <div className="round-stats-section">
                <div className="round-stat">
                  <p className="round-stat-label">Slope</p>
                  <p className="round-stat-value">{courseData.course_slope}</p>
                </div>
              </div>
        
              <div className="round-stats-section">
                <div className="round-stat">
                  <p className="round-stat-label">Rating</p>
                  <p className="round-stat-value">{courseData.course_rating}</p>
                </div>
              </div>
            </div>
          </div>
        );
        };

export default CoursePlayed;