import React,{useState} from "react";
import AddMovie from "./AddMovie";
import MovieList from "./MovieList";

export default function(){
    const [movieList,setMovieList]=useState([]);

    return (
        <div>
            <AddMovie setMovieList={setMovieList} />
            <MovieList />
        </div>
    );
}