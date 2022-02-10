import React from "react";
import AddMovie from "./AddMovie";
import MovieList from "./MovieList";
import '../../assests/css/Home.css';
import Search from "./Search";
import SearchMovieList from "./SearchMovieList";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import MyMovies from "./MyMovies";

export default function Home(){
    const {state}=useContext(AppContext);

    return (
        <div className="home">
            <div className="header">
                <AddMovie />
                <MyMovies />
            </div>
            {/* <AddMovie />
            <MyMovies /> */}
            
            <Search />
            {state?.isSearch &&<SearchMovieList />}
            {
                state?.isSearch===false &&
                <MovieList />
            }
            
        </div>
    );
}