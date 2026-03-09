import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await loginUser(form);

      // success popup
      alert(response.message || "Login successful");

      // redirect to dashboard
      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      // error popup
      if (
        error.response &&
        error.response.data &&
        error.response.data.detail
      ) {
        alert(error.response.data.detail);
      } else {
        alert("Invalid email or password");
      }

    }
  };

  return (
    <div className="auth-container">

      <h1>NeuroDesk</h1>
      <h3>Login</h3>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

      </form>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>

    </div>
  );
}

export default Login;