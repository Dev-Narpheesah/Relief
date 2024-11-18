import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";
import axios from 'axios';
import { toast } from "react-toastify";
import PasswordInput from '../passwordInput/passwordInput';
import { UserContext } from "../../../context/userContext";

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const Register = () => {
  const { setUser} = useContext(UserContext);
  const [formData, setFormData] = useState(initialState);
  const [formCompleted, setFormCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValidMessage, setFormValidMessage] = useState("");

  const { username, email, password, confirmPassword } = formData;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      axios.post('http://localhost:4000/api/admin/register', formData)
      .then((response) => {
        setUser(response.data)
        setIsSubmitting(false);
        setFormCompleted(true);
        toast.success("Registration Successfully")
        navigate('/signin', {state: {user: response.data}});
      });
  
    } catch (error) {
      setIsSubmitting(false);
      console.error('Failed to register user', error);
      toast.error('Failed to register user');
    }
  };

  return (
    <div className={styles.container_reg}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <p>User Name</p>
        <input
          value={username}
          placeholder="eg: username"
          id='username'
          onChange={handleInputChange}
          required
        />

        <p>Email Address</p>
        <input
          value={email}
          placeholder="example@gmail.com"
          id='email'
          onChange={handleInputChange}
          required
        />

        <div>
          <label className={styles.password}>Password</label>
          <PasswordInput
            type="password"
            className={styles.input}
            value={password}
            placeholder="Enter your password"
            required
            id='password'
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className={styles.password}>Confirm Password</label>
          <PasswordInput
            type="password"
            className={styles.input}
            value={confirmPassword}
            placeholder="Re-enter your password"
            required
            id='confirmPassword'
            onChange={handleInputChange}
          />
        </div>
        
        <button className={styles.btn} disabled={isSubmitting}>
          {isSubmitting ? "Signing you up..." : "Create Account"}
        </button>
        
        <div>
          <p style={{ textAlign: "center" }}>Already registered?{' '}
            <Link to='/signin' style={{ color: "#11648a" }}>Sign In</Link>
          </p>
        </div>
        
        {formValidMessage && <p className="error-message">{formValidMessage}</p>}
      </form>
    </div>
  );
};

export default Register;
