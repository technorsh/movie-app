import React,{useContext} from "react";
import { InputGroup,Input,InputGroupAddon } from "reactstrap";
import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent";
import AppContext from "../../context/AppContext";

const SearchStyle=styled("div")`
    margin:0 7% 0 9%;
    padding: 2rem 3rem;
`

export default function Search(){
    const {state,actions}=useContext(AppContext);
    
    function onChangeHandler(e){
        actions?.setInput(e.target.value);
    }

    return (
        <SearchStyle>
            <InputGroup>
                <Input type="text" value={state?.input} onChange={onChangeHandler} placeholder="Search by movie name" />
                <InputGroupAddon addonType="append">
                        <ButtonComponent color="warning" onClickHandler={actions?.searchHandler} shadow disabled={state?.loading}>Search </ButtonComponent>
                </InputGroupAddon>
            </InputGroup>
        </SearchStyle>
    );
}