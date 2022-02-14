import React ,{ useContext } from "react";
import AppContext from "../../context/AppContext";
import  MovieItem from "./MovieItem";

export default function SearchMovieList(){
    const {state}=useContext(AppContext);
    return (
        <div className="searchMovieList">
            <ul>
            {state?.searchedMovieList?.length? state?.searchedMovieList?.map(item=>{
                return <MovieItem movie={item} key={item?.id} />
            }) :<h2>No results found ...</h2> }
            </ul> 
        </div>
    );
}