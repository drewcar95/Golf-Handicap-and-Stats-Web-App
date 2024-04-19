import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as React from "react";
import HomePage from "./views/HomePage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import Stats from "./views/statsPage";
import Profile from "./views/profile";
import NewFullRound from './views/newFullRound';
import PostQuickRound from './views/postQuickRound';
import About from './views/about';
import AboutHandicap from './views/aboutHandicap';
import UpdateRoundPage from './views/updateRoundPage';
import ChooseCourse from './views/chooseCourse';
import RoundDetails from './views/roundDetails';
import TourPage1 from './views/tourPG1';
import TourPage2 from './views/tourPG2';
import TourPage3 from './views/tourPG3';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-handicap" element={<AboutHandicap />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/view-rounds" element={<Stats />} />
          <Route path="/post-full-round/:course_id" element={<NewFullRound />} />
          <Route path="/post-round-summary/:course_id" element={<PostQuickRound />} />
          <Route path="/edit-round/:roundId/:course_id" element={<UpdateRoundPage />} />
          <Route
            path="/view-round/:roundId/:course_id"
            element={<RoundDetails />}
          />
          <Route path="/select-course" element={< ChooseCourse />} />
          <Route path="/tour-pg-1" element={< TourPage1 />} />
          <Route path="/tour-pg-2" element={< TourPage2 />} />
          <Route path="/tour-pg-3" element={< TourPage3 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;