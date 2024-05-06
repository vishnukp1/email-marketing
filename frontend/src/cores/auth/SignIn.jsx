import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/");
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <div className="flex flex-col justify-center h-full pb-16 ">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" className="bg-white">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ color: "#204289" }} className="font-semibold text-sm">
              Powered By <span style={{ color: "#F46524" }}>E-Market</span>
            </div>
          
            <Typography component="h1" variant="h4" className="pt-4">
              Welcome!
            </Typography>
            <Typography component="h1" variant="h6" className="pt-0">
              Login To get Started
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>

            <Typography component="p" style={{marginBottom:"10px"}}  variant="body2" className="forgot-password text-right">
              Don't have an account? {" "}
              <Link to="/signup" style={{ color: "red" }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
