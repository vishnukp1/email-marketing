import { useState } from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
      await axios.post("http://localhost:3000/api/register", formData);
      navigate("/signin");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center h-full pb-16 ">
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
            Sign Up To Get Started
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              Sign Up
            </Button>
          </form>
          <Typography
            component="p"
            variant="body2"
            className="text-center"
            style={{ marginTop: "16px" }}
          >
            Already have an account?{" "}
            <Link to="/signin" style={{ color: "#F46524" }}>
              Sign In
            </Link>
          </Typography>
        </Container>
      </ThemeProvider>
    </div>
  );
}
