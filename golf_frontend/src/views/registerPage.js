import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState} from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Navbar from "../components/navbar";
import axios from 'axios'; 

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Register() {
  const [open, setOpen] = React.useState(false);


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://teetimeanalytics-backend-django.com/api/register/', {
        username,
        password,
      });
  
      // Registration was successful, show success message
      setOpen(true);
      console.log('Registration successful:', response.data);
  
      // Redirect the user to the login page or perform other actions
      // Example: navigate('/login');
    } catch (error) {
      // Handle registration error
      console.error('Registration error:', error);
      // Display an error message to the user
    }
  };
  const navigate = useNavigate();
  const loginPage = () => {
    navigate("/login");
  };
  const theme = createTheme();
  return (
    <>
        <Navbar />
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
                >
                Registration Successful! Log in!
                </Alert>
            </Snackbar>
            <Box
                sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "#006400" }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
                >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={username} // Use the state variable
                        onChange={(e) => setUsername(e.target.value)} // Update the state variable
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password1"
                        label="Password"
                        type="password"
                        id="password"
                        value={password} // Use the state variable
                        onChange={(e) => setPassword(e.target.value)} // Update the state variable
                        autoComplete="new-password"
                    />{" "}
                    </Grid>
                    
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="center">
                    <Grid item>
                    <Link component="button" onClick={loginPage} variant="body2">
                        Already have an account? Sign in
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Box>
            </Stack>
            
        </Container>
        </ThemeProvider>
    </>
  );
}

export default Register;
