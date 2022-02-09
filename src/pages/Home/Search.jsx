import React,{useContext,useState} from "react";
import { InputGroup,Input,InputGroupAddon,Button } from "reactstrap";
import '../../assests/css/Search.css';
import AppContext from "../../context/AppContext";

export default function Search(){
    const [input,setInput]=useState("");
    const {actions}=useContext(AppContext);
    const axios=require('axios');

    function onChangeHandler(e){
        setInput(e.target.value);
    }

// adult: false
// backdrop_path: "/t4To8feUSysyBs4tlBAbXIrKlCv.jpg"
// genre_ids: (2) [28, 53]
// id: 860623
// original_language: "en"
// original_title: "Last Man Down"
// overview: "After civilization succumbs to a deadly pandemic and his wife is murdered, a special forces soldier abandons his duty and becomes a hermit in the Nordic wilderness. Years later, a wounded woman appears on his doorstep. She's escaped from a lab and her pursuers believe her blood is the key to a worldwide cure. He's hesitant to get involved, but all doubts are cast aside when he discovers her pursuer is none other than Commander Stone, the man that murdered his wife some years ago."
// popularity: 2257.001
// poster_path: "/4B7liCxNCZIZGONmAMkCnxVlZQV.jpg"
// release_date: "2021-10-19"
// title: "Last Man Down"
// video: false
// vote_average: 6.5
// vote_count: 210

    function searchHandler(){
        axios
            .get(
            `https://api.themoviedb.org/3/search/movie?api_key=1f49aa891b7f48738c691da267debcdf&page=1&query=${input}`
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
                // console.log({newList});
                actions?.setSearchMovieList(newList);
            });
        actions.setIsSearch(true);
    }
    return (
        <div className="search">
            <InputGroup>
                <Input type="text" value={input} onChange={onChangeHandler} placeholder="Search by movie name" />
                <InputGroupAddon addonType="append">
                    <div className="search-button">
                        <Button color="warning" onClick={searchHandler} >Search</Button>
                    </div>                   
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}