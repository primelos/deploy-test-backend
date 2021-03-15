import React, { useState, useEffect } from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Post from './Posts'
import Home from './Home'

function App() {

  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
           
       
          <Route path="/:id/posts" component={Post} />
            
        
        </Switch>
      </div>
    </Router>
  );
}

export default App;
