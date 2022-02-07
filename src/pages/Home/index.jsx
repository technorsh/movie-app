import React from "react";
import AddMovie from "./AddMovie";
import MovieList from "./MovieList";
import '../../assests/css/Home.css';

export default function Home(){

    return (
        <div className="home">
            <AddMovie />
            <MovieList />
        </div>
    );
}