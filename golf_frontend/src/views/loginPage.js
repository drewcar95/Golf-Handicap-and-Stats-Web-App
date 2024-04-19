import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { useState, useEffect  } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
   
const theme = createTheme();

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated when the component mounts
        if (localStorage.getItem('access_token') !== null) {
        navigate('/')
        } 
    }, [navigate]);

    const submit = async e => {
        e.preventDefault();
 
        const user = {
            username: username,
            password: password
          };

        const {data} = await axios.post('https://teetimeanalytics-backend-django.com/api/token/', user ,{headers: {
            'Content-Type': 'application/json'
        }}, {withCredentials: true});

        console.log(data)
        localStorage.clear();

        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('username', user.username);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;

        // Get the user ID and store it in local storage
        const response = await axios.get(`https://teetimeanalytics-backend-django.com/api/get-user-id/${user.username}/`);
        const userId = response.data.user_id;
        localStorage.setItem('user_id', userId);


        window.location.href = '/'

    }

    const signUp = () => {
        navigate("/register");
  };
  return (
    <>
    <Navbar />
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
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
                Sign in
            </Typography>
            <Box
                component="form"
                onSubmit={submit}
                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                margin="normal"
                required
                fullWidth
                placeholder="Enter Username"
                name='username'
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
                />
                <br />
                <span
                style={{
                    fontWeight: "bold",
                    color: "red",
                }}
                >
                {/* {emailError} */}
                </span>
                <TextField
                margin="normal"
                required
                fullWidth
                name='password'
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
    
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
                <Grid container>
    
                <Grid item>
                    <Link component="button" onClick={signUp} variant="body2">
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    </>
  );
};

export default LoginPage;
