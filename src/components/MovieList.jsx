import React from "react";
import MovieItem from "./MovieItem";

export default function MovieList({setMovieList}){
    const list=JSON.parse(localStorage.getItem('list'));
    const movieList=list??[];
    return (
        <div className="movieList">
            <ul>
            {movieList.map(item=><MovieItem setMovieList={setMovieList} movie={item} key={item.id} />)}
            </ul>
            
        </div>
    )
}