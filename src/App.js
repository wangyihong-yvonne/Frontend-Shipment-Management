/*eslint-disable no-unused-vars*/
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoggedIn from './components/LoginContext';
import HomePage from './pages/HomePage';
import ShipmentListPage from './pages/ShipmentListPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
/*eslint-enable no-unused-vars*/

function App() {
  const defaultLoginInfo = {
    loggedIn: false,
    username: null,
    userId: null,
  };

  const localUser = localStorage.getItem('loginInfo');
  const loginInfo = localUser ? JSON.parse(localUser) : defaultLoginInfo;

  const [loggedIn, setLoggedIn] = useState(loginInfo);

  const setLoggedInHelper = (loggedIn, username, userId) => {
    const loginObj = {
      loggedIn: loggedIn,
      username: username,
      userId: userId,
    };
    localStorage.setItem('loginInfo', JSON.stringify(loginObj));
    setLoggedIn(loginObj);
  };
  return (
    <LoggedIn.Provider value={{ loggedIn, setLoggedInHelper }}>
      <Router>
        <div className="App"></div>
        <NavBar />
        <div>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <PrivateRoute
              path="/shipment-list"
              authed={loggedIn.loggedIn}
              component={ShipmentListPage}
            />
            <Route path="/login" render={(props) => <LoginPage {...props} />} />
            <Route path="/register" component={RegisterPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </LoggedIn.Provider>
  );
}

export default App;
