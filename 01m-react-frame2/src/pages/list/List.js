import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, withRouter } from "react-router-dom";
 
const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Users = () => <h2>Users</h2>;
const AppRouter = (props) => (
  
  <BrowserRouter>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/users/">Users</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </Switch>
      <div>{props.location.pathname}</div>
    </div>
  </BrowserRouter>
);
export default withRouter(AppRouter);