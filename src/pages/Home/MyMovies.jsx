import React,{ useContext } from "react";
import { Button } from "reactstrap";
import AppContext from "../../context/AppContext";
import styled from "styled-components";

const MyMoviesStyle=styled("div")`
    width:50%;
    margin:0.5rem 0.5rem;
`
export default function MyMovies(){
    const {actions}=useContext(AppContext);
    function onClickHandler(){
        actions?.setIsSearch(false);
        actions?.setInput("");
    }
    return (
        <MyMoviesStyle>
            <Button color="info" size="lg" onClick={onClickHandler} block>
                    My Movies
            </Button>
        </MyMoviesStyle>
    );
}