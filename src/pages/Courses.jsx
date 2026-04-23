import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../services/courseService";
import "../styles/Courses.css";

function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getCourses();
      setCourses(data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load courses");
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="courses-container"><p>Loading courses...</p></div>;
  }

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h1>Available Courses</h1>
        <button 
          className="create-btn" 
          onClick={() => navigate("/create-course")}
        >
          + Create Course
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {courses.length === 0 ? (
        <p className="no-courses">No courses available yet</p>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p className="price">${course.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
