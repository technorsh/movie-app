import React from "react";
import { Spinner } from 'reactstrap';

export default function Loading(){
    return (
        <div className="loading">
            <center>
                <Spinner type="grow" color="success" />
                <Spinner type="grow" color="success" />
                <Spinner type="grow" color="success" />
            </center>
        </div>
    );
}