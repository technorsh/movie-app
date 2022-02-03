import React from "react";
import AddMovie from "./AddMovie";
import MovieList from "./MovieList";
import '../assests/Home.css';

export default function(){

    return (
        <div className="home">
            <AddMovie />
            <MovieList />
        </div>
    );
}