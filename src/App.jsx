import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import MoviePage from './pages/MoviePage'
import AppProvider from "./context/AppProvider";

function App() {
  const list = JSON.parse(localStorage.getItem("list"));

  return (
    <BrowserRouter>
      <AppProvider list={list}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:id" component={MoviePage} />
          </Switch>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
