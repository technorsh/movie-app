import React,{useState} from "react";
import Swal from 'sweetalert2';
import AppContext from "./AppContext";

export default function AppProvider(props){
    const [searchedMovieList,setSearchMovieList]=useState([]);
    const [isSearch,setIsSearch]=useState(false);
    const[movieList,setMovieList]=useState(props.list??[]);

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
                sweetAlert('success','Movie removed successfully !');
            } else if (result.isDenied) {
                //if user denied to delete ,then no changes
                sweetAlert('info','Changes are not saved');
            }
        });
        callback && callback();
    }

    const onSaveHandler = (values, callback) => {
        //adding values to movie list and also adding it to local storage
        setMovieList(prev => {
            const newList = [...prev, { ...values}];
            localStorage.setItem('list', JSON.stringify(newList));
            return newList;
        });
        callback && callback();
        //after adding displaying a success alert box
        sweetAlert('success','Movie saved successfully !');
    }

    const contextValue = {
        state: {
            movieList,
            searchedMovieList,
            isSearch
        },
        actions: {
            setMovieList,
            setSearchMovieList,
            setIsSearch,
            onAddHandler,
            onEditHandler,
            onRemoveHandler,
            onSaveHandler
        }
    }
    return (
        <AppContext.Provider value={contextValue}>
            {props?.children}
        </AppContext.Provider>
    );

}