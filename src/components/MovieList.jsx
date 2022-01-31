import React from "react";
import MovieItem from "./MovieItem";

export default function MovieList(){
    const movieList=[{
        movie:"Dhamaka",
        image:"https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/11/dhamaka-1637310639.jpg",
        rating:7,
        overview:"When a cynical ex-TV news anchor gets an alarming call on his radio show, he sees a chance for a career comeback -- but it may cost him his conscience.",
    },{
        movie:"kahaani",
        image:"https://img1.hotstarext.com/image/upload/f_auto,t_hcdl/sources/r1/cms/prod/7114/1037114-h-b8a38e0f0785",
        rating:8,
        overview:"Vidya Bagchi, a pregnant woman, travels to Kolkata from London to search for her missing husband. When all clues lead to a dead end, she realises that there is more than what meets the eye."
    }]
    return (
        <div className="movieList">
            <ul>
            {movieList.map(item=><MovieItem movie={movie} image={image} rating={rating} overview={overview} />)}
            </ul>
            
        </div>
    )
}