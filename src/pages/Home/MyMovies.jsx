import React,{ useContext } from "react";
import AppContext from "../../context/AppContext";
import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent";

const MyMoviesStyle=styled("div")`
    width:50%;
    margin:0.5rem 0.5rem;
`
export default function MyMovies(){
    const {actions}=useContext(AppContext);
    function clickHandler(){
        actions?.setIsSearch(false);
        actions?.setInput("");
    }
    return (
        <MyMoviesStyle>
            <ButtonComponent color="info" size="lg" onClickHandler={clickHandler} block shadow>
                    My Movies
            </ButtonComponent>
        </MyMoviesStyle>
    );
}