import logo from './logo.svg';
import './App.css';
import { Route, Switch, Link,  } from 'react-router-dom';
import { useState } from 'react';
import MembersList from './components/MembersList';
import MemberDetails from './components/MemberDetails';
import BooksList from './components/BooksList';
import BooksDetails from './components/BooksDetails';
import BookItem from './components/BookItem';
import NavBar from './components/NavBar';
import React from "react"

function App() {
  return ( 
  <div>

    <div className="App">
    {/* <NavBar /> */}
      <Switch>
        
      {/* <Route path="/members">
          <MembersList />
        </Route>
        <Route path="/books">
          <BooksList />
        </Route> */}
        <Route path="/members/:slug">
          <MemberDetails />
        </Route>
        <Route path="/books/:slug">
          <BooksDetails />
        </Route>

        <Route path="/">
          {/* <BookItem /> */}
          <MembersList />
          <BooksList />
        </Route>
      </Switch>
    </div></div>
  );
}

export default App;
