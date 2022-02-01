import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useForm } from "react-hook-form";

export default function MovieForm({toggle,setMovieList}) {
  const {register,handleSubmit,errors}=useForm();
  

  function onSubmit(data){
    console.log(data);
    setMovieList(prev=>{
      const newList=[...prev,{...data,id:Math.random()*100}];
      localStorage.setItem('list',JSON.stringify(newList));
      return newList;
    });
  }

  return (
    <div className="movieForm">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="movie">Name</Label>
          <Input innerRef={register({required:true})}
            type="text"
            name="movie"
            id="movie"
            placeholder="name of your favourite movie"
          />
          {errors.name && <p>This field is required</p>}
        </FormGroup>
        <FormGroup>
          <Label for="image">Image</Label>
          <Input innerRef={register({required:true})} type="text" name="image" id="image" placeholder="image url of your favourite movie" />
          {errors.image && <p>This field is required</p>}
        </FormGroup>
        <FormGroup>
          <Label for="rating">Ratings</Label>
          <Input innerRef={register({required:true})}
            type="number"
            name="rating"
            id="rating"
            placeholder="8(out of 10)"
          />
          {errors.rating && <p>This field is required</p>}
        </FormGroup>
        <FormGroup>
          <Label for="overview">Overview</Label>
          <Input innerRef={register({required:true})}
            type="textarea"
            name="overview"
            id="overview"
            placeholder="write the description about the movie"
          />
          {errors.overview && <p>This field is required</p>}
        </FormGroup>
        
        <Button color="primary" type="submit" onClick={toggle}>
          Done
        </Button>
      </Form>
    </div>
  );
}
