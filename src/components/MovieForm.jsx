import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useForm } from "react-hook-form";

export default function MovieForm({toggle}) {
  const {register,handleSubmit,errors}=useForm();
  const [movieList,setMovieList]=useState([{name:"Force"}]);

  function onSubmit(data){
    console.log(data);
    setMovieList(prev=>{
      const newList=[...prev,{...data,id:Math.random()*100}];
      localStorage.setItem('list',newList);
      return newList;
    });
  }

  return (
    <div className="movieForm">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input ref={register({required:true})}
            type="text"
            name="name"
            id="name"
            placeholder="name of your favourite movie"
          />
          {errors.name && <p>This field is required</p>}
        </FormGroup>
        <FormGroup>
          <Label for="image">Image</Label>
          <Input ref={register({required:true})} type="file" name="image" id="image" />
          {errors.image && <p>This field is required</p>}
        </FormGroup>
        <FormGroup>
          <Label for="rating">Ratings</Label>
          <Input ref={register({required:true})}
            type="number"
            name="rating"
            id="rating"
            placeholder="8(out of 10)"
          />
          {errors.rating && <p>This field is required</p>}
        </FormGroup>
        <FormGroup>
          <Label for="overview">Overview</Label>
          <Input ref={register({required:true})}
            type="textarea"
            name="overview"
            id="overview"
            placeholder="write the description about the movie"
          />
          {errors.overview && <p>This field is required</p>}
        </FormGroup>
        <input type="submit" />
        {/* <Button color="primary" type="submit" onClick={toggle}>
          Done
        </Button> */}
      </Form>
    </div>
  );
}
