import React from "react";
import AddMovie from "./AddMovie";
import MovieList from "./MovieList";
import '../assests/Home.css';

export default function({setMovieList}){

    return (
        <div className="home">
            <AddMovie setMovieList={setMovieList} />
            <MovieList setMovieList={setMovieList} />
        </div>
    );
}