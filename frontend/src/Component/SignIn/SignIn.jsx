import React, { useState, useContext, useCallback } from "react";
import styles from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import PasswordInput from "../passwordInput/passwordInput";

const SignIn = () => {
  const navigate = useNavigate();
  // const{ setUser} = useContext(UserContext);
  const [user, setUser] = useState();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { email, password } = formData;

      if (!email || !password) {
        setFormValidMessage("Fill up the required place");
        return;
      }
      setIsSubmitting(true);

      axios
        .post("http://localhost:4000/api/admin/login", formData)
        .then((response) => {
          // console.log(response.data);
          setUser(response.data);
          setIsSubmitting(false);
          toast.success("Login Successful");
          navigate("/user", { state: { user: response.data } });
        })
        .catch((error) => {
          setIsSubmitting(false);
          const message =
            error.response?.status === 400
              ? "Invalid  Credentials"
              : "Server error";
          setFormValidMessage(message);
        });
    },
    [formData, navigate, setUser]
  );

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
          />
        </div>
        <div className={styles.inputContainer}>
          <PasswordInput
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button
          // disabled={loading}
          className={styles.submit}
          type="submit"
        >
          Sign In
        </button>
        <p className={styles.signupLink}>
          No account?
          <Link to="/register">Sign up</Link>
        </p>
        {/* {error && <p>{error}</p>} */}
      </form>
    </div>
  );
};

export default SignIn;
