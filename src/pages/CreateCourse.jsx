import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../services/courseService";

function CreateCourse() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // ✅ Validation
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!formData.description.trim() || formData.description.length < 10) {
      setError("Description must be at least 10 characters");
      return;
    }

    if (formData.price === "" || isNaN(formData.price) || Number(formData.price) < 0) {
      setError("Price must be 0 or greater");
      return;
    }

    setLoading(true);

    try {
      const courseData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price), // ✅ important
      };

      await createCourse(courseData);

      setSuccess("Course created successfully!");

      setTimeout(() => {
        navigate("/courses");
      }, 1200);

    } catch (err) {
      setError(err.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-course-container">
      <div className="create-course-card">

        <button className="back-btn" onClick={() => navigate("/courses")}>
          ← Back to Courses
        </button>

        <h1>Create New Course</h1>
        <p className="subtitle">Fill in the details to create a new course</p>

        <form onSubmit={handleSubmit}>

          {/* Title */}
          <div className="form-group">
            <label>Course Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              maxLength={100}
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label>Price ($) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
          </div>

          {/* Messages */}
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {/* Button */}
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Course"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateCourse;