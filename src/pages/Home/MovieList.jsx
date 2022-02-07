import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import MovieItem from "./MovieItem";

export default function MovieList(){
    const{state}=useContext(AppContext)
    return (
        <div className="movieList">
            <ul>
            {state?.movieList?.map(item=><MovieItem movie={item} key={item?.id} />)}
            </ul>  
        </div>
    )
}