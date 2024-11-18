import React, { useState, useContext, useCallback } from "react";
import styles from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PasswordInput from "../passwordInput/passwordInput";
import { UserContext } from "../../../context/userContext";

const initialState = {
  email: "",
  password: "",
};

const SignIn = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [formValidMessage, setFormValidMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback((e) => {
    setFormValidMessage("");
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

const handleSubmit = useCallback(async (e) => {
  e.preventDefault();
  const { email, password } = formData;

  if (!email || !password) {
    setFormValidMessage("Please fill in all fields");
    return;
  }

  setIsSubmitting(true);

  try {
    console.log("Sending formData:", formData);
    const response = await axios.post(`http://localhost:4000/api/admin/login`, formData);
    setUser(response.data); 
    toast.success("Login Successful");
    navigate("/user");
  } catch (error) {
    console.error("Error response:", error.response);
    const message = error.response?.status === 400
      ? "Invalid Login Credentials"
      : "Server error";
    setFormValidMessage(message);
  } finally {
    setIsSubmitting(false);
  }
}, [formData, navigate, setUser]);



  return (
    <div className={styles.signinContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.formTitle}>Sign In</p>
        <div className={styles.inputContainer}>
          <input
            type="email"
            placeholder="example@123.com"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <PasswordInput
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className={styles.submit} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
        <p className={styles.signupLink}>
          No account?
          <Link to="/signup">Sign up</Link>
        </p>
        {formValidMessage && (
          <p className={styles.errorMessage}>{formValidMessage}</p>
        )}
      </form>
    </div>
  );
};

export default SignIn;
