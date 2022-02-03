import React from "react";
import MovieItem from "./MovieItem";

export default function MovieList(){
    const list=JSON.parse(localStorage.getItem('list'));
    const movieList=list??[];
    return (
        <div className="movieList">
            <ul>
            {movieList.map(item=><MovieItem movie={item} key={item.id} />)}
            </ul>
            
        </div>
    )
}