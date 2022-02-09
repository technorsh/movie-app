import React from "react";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import  MovieItem from "./MovieItem";

export default function SearchMovieList(){
    const {state}=useContext(AppContext);

    return (
        <div className="searchMovieList">
            <ul>
            {state?.searchedMovieList?.map(item=>{
                return <MovieItem movie={item} key={item?.id} />
            })}
            </ul> 
        </div>
    );
}