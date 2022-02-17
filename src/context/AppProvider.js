import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import AppContext from "./AppContext";
import axios from "axios";

export default function AppProvider(props){
    const [searchedMovieList,setSearchMovieList]=useState([]);
    const [isSearch,setIsSearch]=useState(false);
    const [movieList,setMovieList]=useState(props.list??[]);
    const [input,setInput]=useState("");
    const [loading,setLoading]=useState(false);
    const history=useHistory();

    function sweetAlert(icon,text){
        const Toast = Swal.mixin({
            toast: true,
            background:'#f2fcf4',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        Toast.fire({
            icon: icon,
            title: text
        });
    }

    
    const onAddHandler = (values, callback) => {
        //adding values to movie list and also adding it to local storage
        setMovieList(prev => {
            const newList = [...prev, { ...values, id: Math.floor(Math.random() * 100) }];
            localStorage.setItem('list', JSON.stringify(newList));
            return newList;
        });
        callback && callback();
        //after adding displaying a success alert box
        sweetAlert('success','Movie added successfully !');
    }

    const onEditHandler = (id, values, callback) => {
        //updating the value for that particular id in movie list and local storage
        setMovieList(prev => {
            const newList = prev?.map(item => item?.id === id
                ? { ...item, ...values }
                : item
            );
            localStorage.setItem('list', JSON.stringify(newList));
            return newList;
        });
        callback && callback();
        //after updating displaying a success alert box
        sweetAlert('success','Movie updated successfully !');
    }

    const onRemoveHandler = (id, callback) => {
        Swal.fire({
            icon: 'warning',
            background:'#f2fcf4',
            title: 'Do you want to remove the movie?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                //deleting that particular movie with the given id from movie list and then updating local storage
                setMovieList(prev => {
                    const newList = prev?.filter(item => item?.id !== id);
                    localStorage.setItem('list', JSON.stringify(newList));
                    return newList;
                });
                history.push("/");
                sweetAlert('success','Movie removed successfully !');
            } else if (result.isDenied) {
                //if user denied to delete ,then no changes
                sweetAlert('info','Changes are not saved');
            }
        });
        callback && callback();
    }

    const onSaveHandler = (values, callback) => {
        //saving values to movie list and also adding it to local storage
        setMovieList(prev => {
            const elem=prev?.find(item=>item.id===values.id);
            //if that movie already exists in movie list then don't add again else add it to the list
            if(elem){
                sweetAlert('success','Movie is already added !');
                return prev;
            }else{
                const newList = [...prev, { ...values}];
                localStorage.setItem('list', JSON.stringify(newList));
                sweetAlert('success','Movie saved successfully !');
                return newList;
            }
        });
        callback && callback();
    }

    function searchHandler(){
        setLoading(true);
        axios
            .get(
            `https://api.themoviedb.org/3/search/movie?api_key=1f49aa891b7f48738c691da267debcdf&page=1&query=${input}`
            )
            .then((res) => {
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
                setSearchMovieList(newList);
            }).catch(err=>{
                console.log(err);
                setLoading(false);
            })
        setIsSearch(true);
    }

    const contextValue = {
        state: {
            movieList,
            searchedMovieList,
            input,
            isSearch,
            loading
        },
        actions: {
            setMovieList,
            setSearchMovieList,
            setInput,
            setIsSearch,
            onAddHandler,
            onEditHandler,
            onRemoveHandler,
            onSaveHandler,
            searchHandler
        }
    }
    return (
        <AppContext.Provider value={contextValue}>
            {props?.children}
        </AppContext.Provider>
    );

}