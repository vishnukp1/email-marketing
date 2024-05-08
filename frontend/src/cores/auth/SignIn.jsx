import { useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://ems-server-side.onrender.com/api/login", formData);
      const { token } = response.data;
      localStorage.setItem("token", token); // Save token to local storage
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center h-full pb-16">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" className="bg-white">
          <Typography
            component="h1"
            variant="h4"
            className="text-center pt-8"
          >
            Welcome!
          </Typography>
          <Typography component="h1" variant="h6" className="text-center">
            Login To Get Started
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </form>
          <Typography
            component="p"
            variant="body2"
            className="text-center"
            style={{ marginTop: "16px" }}
          >
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#F46524" }}>
              Sign Up
            </Link>
          </Typography>
        </Container>
      </ThemeProvider>
    </div>
  );
}
