import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from './views/HomePage'; // Import your home page component

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} /> {/* Define the route for the home page */}
        {/* Add more routes for other pages here */}
      </Switch>
    </Router>
  );
}

export default AppRouter;
