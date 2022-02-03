import React, { useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import MoviePage from './components/MoviePage';
import MovieListContext from './context/MovieListContext';


function App() {
  const list=JSON.parse(localStorage.getItem('list'));
  const[movieList,setMovieList]=useState(list??[]);
  
  return (
    <MovieListContext.Provider value={{setMovieList}}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/:id">
              <MoviePage />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </MovieListContext.Provider>
  );
}

export default App;
