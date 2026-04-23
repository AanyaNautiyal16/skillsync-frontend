import React, { useEffect, useState } from "react";
import { getCourses } from "../services/courseService";
import { useNavigate } from "react-router-dom";
import "../styles/Courses.css";

function Courses() {
  const navigate = useNavigate();

  // State
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCourses();

      // ✅ IMPORTANT FIX
      setCourses(data?.content || []);

    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="courses-container">
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="courses-container">
      
      {/* Header */}
      <div className="courses-header">
        <h1>Available Courses</h1>

        <button
          className="create-btn"
          onClick={() => navigate("/create-course")}
        >
          + Create Course
        </button>
      </div>

      {/* Error */}
      {error && <div className="error-message">{error}</div>}

      {/* No Courses */}
      {courses.length === 0 ? (
        <p className="no-courses">No courses available yet</p>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p className="price">₹ {course.price}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Courses;