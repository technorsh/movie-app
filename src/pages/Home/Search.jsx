import React,{useContext} from "react";
import { InputGroup,Input,InputGroupAddon,Button } from "reactstrap";
import '../../assests/css/Search.css';
import AppContext from "../../context/AppContext";
import axios from "axios";

export default function Search({loading,setLoading}){
    const {state,actions}=useContext(AppContext);
    
    function onChangeHandler(e){
        actions?.setInput(e.target.value);
    }

    function searchHandler(){
        setLoading(true);
        axios
            .get(
            `https://api.themoviedb.org/3/search/movie?api_key=1f49aa891b7f48738c691da267debcdf&page=1&query=${state?.input}`
            )
            .then((res) => {
                // console.log(res?.data?.results);
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
                });
                setLoading(false);
                actions?.setSearchMovieList(newList);
            }).catch(err=>{
                console.log(err);
                setLoading(false);
            })
        actions.setIsSearch(true);
    }
    return (
        <div className="search">
            <InputGroup>
                <Input type="text" value={state?.input} onChange={onChangeHandler} placeholder="Search by movie name" />
                <InputGroupAddon addonType="append">
                    <div className="search-button">
                        <Button color="warning" onClick={searchHandler} disabled={loading}>Search</Button>
                    </div>                   
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}