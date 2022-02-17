import React from "react";
import MovieItem from "./MovieItem";

export default function MovieList({list}){
    return (
        <>
            <ul>
            {list?.length? list.map(item=>{
                return <MovieItem movie={item} key={item?.id} />
            }) :<h2>No results found ...</h2> }
            </ul>  
        </>
    )
}