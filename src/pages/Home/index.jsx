import React ,{useState,useContext} from "react";
import AddMovie from "./AddMovie";
import MovieList from "./MovieList";
import '../../assests/css/Home.scss';
import Search from "./Search";
import { Spinner } from 'reactstrap';
import AppContext from "../../context/AppContext";
import MyMovies from "./MyMovies";
import SearchMovieList from "./SearchMovieList";

export default function Home(){
    const {state}=useContext(AppContext);
    const [loading,setLoading]=useState(false);

    return (
        <div className="home">
            <div className="header">
                <AddMovie />
                <MyMovies />
            </div>
            <Search setLoading={setLoading} loading={loading} />
            {state?.isSearch && loading && 
                <div className="spinner">
                    <center>
                    <Spinner type="grow" color="success" />
                    <Spinner type="grow" color="success" />
                    <Spinner type="grow" color="success" />
                    </center>
                </div>
            }
            {state?.isSearch && !loading ? <SearchMovieList />:<MovieList />}
            
        </div>
    );
}
