import React,{useState} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import MoviePage from './components/MoviePage';


function App() {
  const [movieList,setMovieList]=useState([]);
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home setMovieList={setMovieList}/>
          </Route>
          <Route path="/:id">
            <MoviePage setMovieList={setMovieList}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
