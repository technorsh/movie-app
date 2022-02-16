import React,{useContext} from "react";
import { InputGroup,Input,InputGroupAddon,Button } from "reactstrap";
import '../../assests/css/Search.scss';
import AppContext from "../../context/AppContext";

export default function Search({loading,setLoading}){
    const {state,actions}=useContext(AppContext);
    
    function onChangeHandler(e){
        actions?.setInput(e.target.value);
    }

    return (
        <div className="search">
            <InputGroup>
                <Input type="text" value={state?.input} onChange={onChangeHandler} placeholder="Search by movie name" />
                <InputGroupAddon addonType="append">
                    <div className="search-button">
                        <Button color="warning" onClick={actions?.searchHandler} disabled={state?.loading}>Search</Button>
                    </div>                   
                </InputGroupAddon>
            </InputGroup>
        </div>
    );
}