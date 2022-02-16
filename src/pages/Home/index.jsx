import React, { useContext } from "react";
import AddMovie from "./AddMovie";
import MovieList from "./MovieList";
import "../../assests/css/Home.scss";
import Search from "./Search";
import AppContext from "../../context/AppContext";
import MyMovies from "./MyMovies";
import Loading from "./Loading";

export default function Home() {
  const { state } = useContext(AppContext);

  return (
    <div className="home">
      <div className="header">
        <AddMovie />
        <MyMovies />
      </div>
      <Search />
      {state?.isSearch && state?.loading && <Loading />}
      {!state?.loading && (
        <MovieList
          list={state?.isSearch ? state?.searchedMovieList : state?.movieList}
        />
      )}
    </div>
  );
}
