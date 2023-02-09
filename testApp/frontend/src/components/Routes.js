import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { SignIn } from './SignIn';
export default function Routes() {
  const [token, setToken] = useState(undefined);
  const [username, setUserName] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    setToken(token);
    setUserName(username);
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!!token ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {!!token ? (
            <Redirect to="/dashboard" />
          ) : (
            <SignIn setToken={setToken} setUserName={setUserName} />
          )}
        </Route>
        <Route path="/dashboard">
          {!!token ? (
            <Dashboard token={token} setToken={setToken} username={username} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </Router>
  );
}
