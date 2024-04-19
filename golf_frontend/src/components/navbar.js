import { useState, useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import logo from "../images/golf-logo.jpg";



function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    } else {
      setIsAuth(false); // Ensure that isAuth is false if no token is found
    }
  }, []);


  const navigate = useNavigate();
  const path = useLocation();

  const handleLogout = async () => {
    try {
        const response = await axios.post('/api/logout/', {
            refresh_token: 'your_refresh_token_here', // Include the user's refresh token
        });
        if (response.status === 200) {
            

        }
    } catch (error) {
        // Handle error
        console.error('Logout error:', error);
    }
    localStorage.removeItem('access_token');
    localStorage.clear();
    setIsAuth(false);
    navigate("/");

};

//Navbar Naviagtions

  const homePage = () => {
    navigate("/");
  };
  const loginPage = () => {
    navigate("/login");
  };
  const signUp = () => {
    navigate("/register");
  };
  const profilePage = () => {
    navigate("/profile");
  };
  const aboutPage = () => {
    navigate("/about");
  };
  const prevRounds = () => {
    navigate("/view-rounds")
  }
  const startTour = () => {
    navigate("/tour-pg-1")
  }
  const tourpg2 = () => {
    navigate("/tour-pg-2")
  }
  const tourpg3 = () => {
    navigate("/tour-pg-3")
  }

  const isViewRoundPage = isAuth && location.pathname.startsWith("/view-round/");
  const isEditRoundPage = isAuth && location.pathname.startsWith("/edit-round/");
  const isPostRoundPage = isAuth && location.pathname.startsWith("/post-full-round/");
  const isPostRoundSummaryPage = isAuth && location.pathname.startsWith("/post-round-summary/");

  return (
    <AppBar position="sticky" style={{ backgroundColor: "#006400", border: "2px solid black" }}>
      <Toolbar>
        
            <>
              <img
              src={logo}
              width="50px"
              height="50px"
              style={{ padding: "5px", borderRadius: "50%" }}
              alt="Logo"
              />
              
            </>
         
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1 }}
          onClick={homePage}
        >
          Tee Time Analytics
        </Typography>

        {path.pathname === "/about" ?(
          <>
            <Button color="inherit" onClick={homePage}>
              Homepage
            </Button>
          </>
        ):null}

        {path.pathname === "/tour-pg-1" ?(
          <>
            <Button color="inherit" onClick={homePage}>
              Homepage
            </Button>
            <Button color="inherit" onClick={tourpg2}>
              Next
            </Button>
          </>
        ):null}

        {path.pathname === "/tour-pg-2" ?(
          <>
            <Button color="inherit" onClick={startTour}>
              Previous
            </Button>
            <Button color="inherit" onClick={tourpg3}>
              Next
            </Button>
          </>
        ):null}

        {path.pathname === "/tour-pg-3" ?(
          <>
            <Button color="inherit" onClick={tourpg2}>
              Previous
            </Button>
            <Button color="inherit" onClick={homePage}>
              Finish Tour
            </Button>
          </>
        ):null}

        {path.pathname === "/about-handicap" ?(
          <>
            <Button color="inherit" onClick={homePage}>
              Homepage
            </Button>
          </>
        ):null}
       
        {isAuth && path.pathname === "/" ?(
          <>
            
            <Button color="inherit" onClick={aboutPage}>
              About
            </Button>
            <Button color="inherit" onClick={profilePage}>
              Profile
            </Button>
            <Button color="inherit" onClick={prevRounds}>
              View Rounds
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ):null}

        {!isAuth && path.pathname === "/" ?(
          <>
            <Button color="inherit" onClick={startTour}>
              Tour of Site
            </Button>
            <Button color="inherit" onClick={aboutPage}>
              About
            </Button>
            <Button color="inherit" onClick={loginPage}>
              Login
            </Button>
            <Button color="inherit" onClick={signUp}>
              Sign Up
            </Button>
          </>
        ):null}

        {!isAuth && path.pathname === "/login" ?(
          <>
            <Button color="inherit" onClick={homePage}>
              Homepage
            </Button>
            <Button color="inherit" onClick={signUp}>
              Sign Up
            </Button>
          </>
        ):null}

        {!isAuth && path.pathname === "/register" ?(
          <>
            <Button color="inherit" onClick={homePage}>
              Homepage
            </Button>
            <Button color="inherit" onClick={loginPage}>
              Login 
            </Button>
          </>
        ):null}

        {isAuth && path.pathname === "/profile" ?(
          <>
            <Button color="inherit" onClick={prevRounds}>
              My Rounds 
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ):null}

        {isAuth && path.pathname === "/view-rounds" ?(
          <>
            <Button color="inherit" onClick={profilePage}>
              Profile 
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ):null}


        {isAuth && path.pathname === "/select-course" ?(
          <>
            <Button color="inherit" onClick={profilePage}>
              Profile 
            </Button>
            <Button color="inherit" onClick={prevRounds}>
              My Rounds 
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ):null}

        {isAuth && isViewRoundPage && (
          <>
            <Button color="inherit" onClick={profilePage}>
              Profile 
            </Button>
            <Button color="inherit" onClick={prevRounds}>
              My Rounds 
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}

        {isAuth && isEditRoundPage && (
          <>
            <Button color="inherit" onClick={profilePage}>
              Profile 
            </Button>
            <Button color="inherit" onClick={prevRounds}>
              My Rounds 
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}

        {isAuth && isPostRoundPage && (
          <>
            <Button color="inherit" onClick={profilePage}>
              Profile 
            </Button>
            <Button color="inherit" onClick={prevRounds}>
              My Rounds 
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}

        {isAuth && isPostRoundSummaryPage && (
          <>
            <Button color="inherit" onClick={profilePage}>
              Profile 
            </Button>
            <Button color="inherit" onClick={prevRounds}>
              My Rounds 
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
