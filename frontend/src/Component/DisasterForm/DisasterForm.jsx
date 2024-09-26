import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./DisasterForm.module.css";
import axios from "axios";

// import { AuthContext } from "../../../Context/AuthContext";

const initialState = {
  username: "",
  password: "",
  email: "",
  gender: "",
  phone: 0,
  disasterType: "",
  userImage: null,
  stakeholderName: "",
  stakeholderPhone: 0,
  stakeholderPosition: "",
  location: "",
  report: "",
};

const DisasterForm = () => {
  const navigate = useNavigate();
  // const { createDisasterReport } = useContext(AuthContext);
  const [formData, setFormData] = useState(initialState);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, userImage: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/user/register-user', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.data.success === false) {
        toast.error('Failed to submit report');
        setIsLoading(false);
        return;
      }
      
      toast.success('Disaster Report Submitted Successfully');
      navigate('/card');
    } catch (error) {
      setIsLoading(false);
      console.error('Failed to submit disaster report', error);
      toast.error('Failed to submit disaster report');
    }
  };
  


  return (
    <div className={styles.wrapper}>
      <form className={styles.container} onSubmit={handleSubmit}>

      <div>
         {/* User Name */}
         <label htmlFor="username">User Name</label>
        <input
          name="username"
          type="text"
          placeholder="e.g. example"
          value={formData.username}
          onChange={handleChange}
          required
        />

        {/* Email Address */}
        <label htmlFor="email">Email Address</label>
        <input
    
          name="email"
          type="email"
          placeholder="e.g., example@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* password */}
        <label htmlFor="password">Password</label>
        <input
        
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Gender */}
        <label htmlFor="gender">Gender</label>
        <input
          
          name="gender"
          type="text"
          placeholder="your gender"
          value={formData.gender}
          onChange={handleChange}
          required
        />

        {/* Phone Number */}
        <label htmlFor="phone">Phone Number</label>
        <input
          
          name="phone"
          type="tel"
          placeholder="e.g., +234 567890"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        {/* Disaster Type */}
        <label htmlFor="disasterType">Disaster Type</label>
        <select
        
          name="disasterType"
          value={formData.disasterType}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="">Select Disaster Type</option>
          <option value="flood">Flood</option>
          <option value="earthquake">Earthquake</option>
          <option value="fire">Fire</option>
          <option value="hurricane">Hurricane</option>
          <option value="tornado">Tornado</option>
          <option value="other">Other</option>
        </select>
   </div>
    <div>
        {/* Image Upload */}
        {/* <label htmlFor="userImage" className={styles.imgLabel}>
          <input
            type="file"
            id="userImage"
            name="userImage"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className={styles.previewImage}
            />
          )}
          <p>Upload Disaster Image</p>
        </label> */}

        {/* Stakeholder Name */}
        <label htmlFor="stakeholderName">Stakeholder Name</label>
        <input
          
          name="stakeholderName"
          type="text"
          placeholder="e.g. Stakeholder Name"
          value={formData.stakeholderName}
          onChange={handleChange}
          required
        />

        {/* Stakeholder Phone */}
        <label htmlFor="stakeholderPhone">Stakeholder Phone </label>
        <input
          
          name="stakeholderPhone"
          type="tel"
          placeholder="e.g., +234 567890"
          value={formData.stakeholderPhone}
          onChange={handleChange}
          required
        />

        {/* Stakeholder Position */}
        <label htmlFor="stakeholderPosition">Stakeholder Position</label>
        <select
        
          name="stakeholderPosition"
          value={formData.stakeholderPosition}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="">Select Position</option>
          <option value="leader">Community Leader</option>
          <option value="volunteer">Volunteer</option>
          <option value="donor">Donor</option>
          <option value="coordinator">Coordinator</option>
          <option value="other">Other</option>
        </select>

        {/* Location */}
        <label htmlFor="location">Location</label>
        <input
        
          name="location"
          type="text"
          placeholder="e.g., 123 Main St, Springfield"
          value={formData.location}
          onChange={handleChange}
          required
        />

        {/* Report */}
        <label htmlFor="report">Report</label>
        <textarea
          
          name="report"
          placeholder="Provide details of the disaster..."
          value={formData.report}
          onChange={handleChange}
          required
        ></textarea>
        {/* Submit Button */}
</div>

          <button type="submit" className={styles.btn_disaster} disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Report"}
        </button>
      

      </form>
    </div>
  );
};

export default DisasterForm;
