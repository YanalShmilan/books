import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Route, Switch, Link } from 'react-router-dom';
import { useState } from 'react';
import MembersList from './components/MembersList';
import MemberDetails from './components/MemberDetails';
import BooksList from './components/BooksList';
import BooksDetails from './components/BooksDetails';
import BookItem from './components/BookItem';
import NavBar from './components/NavBar';
import React from 'react';
import Home from './components/Home';

function App() {
  return (
    <div>
      <div className="App">
        <Switch>
          <Route path="/members/:slug">
            <NavBar />

            <MemberDetails />
          </Route>
          <Route path="/books/:slug">
            <NavBar />

            <BooksDetails />
          </Route>
          <Route path="/members">
            <NavBar />

            <MembersList />
          </Route>
          <Route path="/books">
            <NavBar />

            <BooksList />
          </Route>

          <Route path="/">
            <NavBar />
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
