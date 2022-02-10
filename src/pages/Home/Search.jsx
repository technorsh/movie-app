import React,{useContext,useState} from "react";
import { InputGroup,Input,InputGroupAddon,Button } from "reactstrap";
import '../../assests/css/Search.css';
import AppContext from "../../context/AppContext";

export default function Search(){
    // const [input,setInput]=useState("");
    const {state,actions}=useContext(AppContext);
    const axios=require('axios');

    function onChangeHandler(e){
        actions?.setInput(e.target.value);
    }

    //for movie details : https://api.themoviedb.org/3/movie/634649?api_key=1f49aa891b7f48738c691da267debcdf&language=en-US
    function searchHandler(){
        axios
            .get(
            `https://api.themoviedb.org/3/search/movie?api_key=1f49aa891b7f48738c691da267debcdf&page=1&query=${state?.input}`
            )
            .then((res) => {
                console.log(res?.data?.results);
                const newList=res?.data?.results?.map(item=>{
                    const data={
                        id:item?.id,
                        overview:item?.overview,
                        movie:item?.title,
                        image:item?.poster_path?`https://image.tmdb.org/t/p/w500${item?.poster_path}`:null,
                        releaseDate:item?.release_date,
                        language:item?.original_language,
                        rating:item?.vote_average,
                        voteCount:item?.vote_count,
                    };
                    return data;
                })
                
                actions?.setSearchMovieList(newList);
            });
        actions.setIsSearch(true);
    }
    return (
        <div className="search">
            <InputGroup>
                <Input type="text" value={state?.input} onChange={onChangeHandler} placeholder="Search by movie name" />
                <InputGroupAddon addonType="append">
                    <div className="search-button">
                        <Button color="warning" onClick={searchHandler} >Search</Button>
                    </div>                   
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}