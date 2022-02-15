import React,{ useContext } from "react";
import { Button } from "reactstrap";
import AppContext from "../../context/AppContext";
import '../../assests/css/MyMovies.scss';

export default function MyMovies(){
    const {actions}=useContext(AppContext);
    function onClickHandler(){
        actions?.setIsSearch(false);
        actions?.setInput("");
    }
    return (
        <div className="myMovies">
            <Button color="info" size="lg" onClick={onClickHandler} block>
                    My Movies
            </Button>
        </div>
    );
}