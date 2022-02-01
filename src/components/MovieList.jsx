import React from "react";
import MovieItem from "./MovieItem";

export default function MovieList(){
    const list=JSON.parse(localStorage.getItem('list'));
    const movieList=list??[];
    return (
        <div className="movieList">
            <ul>
            {movieList.map(item=><MovieItem key={item.id} id={item.id} movie={item.movie} image={item.image} rating={item.rating} overview={item.overview} />)}
            </ul>
            
        </div>
    )
}