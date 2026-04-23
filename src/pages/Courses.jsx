import React, { useEffect, useState } from "react";
import { getCourses } from "../services/courseService";
import { useNavigate } from "react-router-dom";
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

      const response = await getCourses();

      // ✅ Handle both paginated & normal response
      if (response?.content) {
        setCourses(response.content);
      } else if (Array.isArray(response)) {
        setCourses(response);
      } else {
        setCourses([]);
      }

    } catch (err) {
      console.error("Error fetching courses:", err);
      setError(err.response?.data?.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Loading state
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

      {/* Empty State */}
      {courses.length === 0 ? (
        <p className="no-courses">No courses available yet</p>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              
              <h3>{course.title}</h3>

              <p>{course.description}</p>

              <p className="price">
                ${Number(course.price).toFixed(2)}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;