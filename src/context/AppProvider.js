import React,{useState} from "react";
import Swal from 'sweetalert2';
import AppContext from "./AppContext";

export default function AppProvider(props){
    
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
        setMovieList(prev => {
            const newList = [...prev, { ...values, id: Math.floor(Math.random() * 100) }];
            localStorage.setItem('list', JSON.stringify(newList));
            return newList;
        });
        callback && callback();
        sweetAlert('success','Movie added successfully !');
    }

    const onEditHandler = (id, values, callback) => {
        setMovieList(prev => {
            const newList = prev?.map(item => item?.id === id
                ? { ...item, ...values }
                : item
            );
            localStorage.setItem('list', JSON.stringify(newList));
            return newList;
        });
        callback && callback();

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
                setMovieList(prev => {
                    const newList = prev?.filter(item => item?.id !== id);
                    localStorage.setItem('list', JSON.stringify(newList));
                    return newList;
                });
                sweetAlert('success','Movie removed successfully !');
            } else if (result.isDenied) {
                sweetAlert('info','Changes are not saved');
            }
        });
        callback && callback();
    }

    const contextValue = {
        state: {
            movieList
        },
        actions: {
            setMovieList,
            onAddHandler,
            onEditHandler,
            onRemoveHandler
        }
    }
    return (
        <AppContext.Provider value={contextValue}>
            {props?.children}
        </AppContext.Provider>
    );

}