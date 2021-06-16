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

function App() {
  return (
    <div className="App">
  
      <Switch>
      <Route path="/members/:slug">
          <MemberDetails />
        </Route>
        <Route path="/members/:slug">
          <MemberDetails />
        </Route>
        <Route path="/books/:slug">
          <BooksDetails />
        </Route>

        <Route path="/">
          <BookItem />
          <MembersList />
          <BooksList />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
