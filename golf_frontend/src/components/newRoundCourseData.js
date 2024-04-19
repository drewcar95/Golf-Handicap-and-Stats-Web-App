import React, { useState, useEffect } from 'react';
import { API_ENDPOINT } from "../components/api";
import { useParams } from 'react-router-dom';

const NewRoundCourseInfo = () => {
    const { course_id } = useParams();
    const [courseData, setCourseData] = useState([])


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

    return (
            <div>
              {/* Golfer Name */}
              <h2>Course Info</h2>
              <p className="divider"></p>
        
              {/* Stats Section */}
              <div className="stats-section">
                <div className="course-stat">
                  <p className="stat-label">Course Name</p>
                  <p className="stat-value">{courseData.course_name} </p>
                  <p className="divider"></p>
                </div>
              </div>
              <p className="divider"></p>
              <div className="stats-section">
                <div className="course-stat">
                  <p className="stat-label">Tee Color</p>
                  <p className="stat-value">{courseData.course_tee_color} </p>
                  <p className="divider"></p>
                </div>
              </div>
              <p className="divider"></p>
              <div className="stats-section">
                <div className="course-stat">
                  <p className="stat-label">Yardage</p>
                  <p className="stat-value">{courseData.course_yardage} </p>
                  <p className="divider"></p>
                </div>
              </div>
              <p className="divider"></p>
              <div className="stats-section">
                <div className="course-stat">
                  <p className="stat-label">Par Value</p>
                  <p className="stat-value">{courseData.par_value} </p>
                  <p className="divider"></p>
                </div>
              </div>
              <p className="divider"></p>
              <div className="stats-section">
                <div className="course-stat">
                  <p className="stat-label">Slope</p>
                  <p className="stat-value">{courseData.course_slope}</p>
                  <p className="divider"></p>
                </div>
              </div>
              <p className="divider"></p>
              <div className="stats-section">
                <div className="course-stat">
                  <p className="stat-label">Rating</p>
                  <p className="stat-value">{courseData.course_rating}</p>
                  <p className="divider"></p>
                </div>
              </div>
            </div>
          );
        };

export default NewRoundCourseInfo;