import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../services/courseService";
import { getTokenPayload } from "../Utility/auth";
import "../styles/CreateCourse.css";

function CreateCourse() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  // UI state
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

  // Handle submit
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

    if (
      formData.price === "" ||
      isNaN(formData.price) ||
      Number(formData.price) < 0
    ) {
      setError("Price must be 0 or greater");
      return;
    }

    setLoading(true);

    try {
      // ✅ Get JWT payload
      const payload = getTokenPayload();

      if (!payload) {
        setError("Session expired. Please login again.");
        setLoading(false);
        return;
      }

      // ⚠️ IMPORTANT: adjust based on your backend
      // If backend expects userId → use payload.userId
      // If backend expects email → use payload.sub

      const courseData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),

        // 🔥 FIX FOR 400 ERROR
        user: {
          id: payload.userId || payload.sub, 
        },
      };

      await createCourse(courseData);

      setSuccess("Course created successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
      });

      // Redirect after delay
      setTimeout(() => {
        navigate("/courses");
      }, 1200);

    } catch (err) {
      console.error("Create course error:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to create course"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-course-container">
      <div className="create-course-card">

        <button
          className="back-btn"
          onClick={() => navigate("/courses")}
        >
          ← Back to Courses
        </button>

        <h1>Create New Course</h1>
        <p className="subtitle">
          Fill in the details to create a new course
        </p>

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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-error">{error}</div>
          )}

          {/* Success */}
          {success && (
            <div className="alert alert-success">{success}</div>
          )}

          {/* Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Course"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateCourse;