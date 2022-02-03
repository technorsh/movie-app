import React, { useEffect } from "react";
import { Button, Form, FormGroup, Label, Input} from "reactstrap";
import { useForm } from "react-hook-form";
import Select from 'react-select';
const options = [
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Horror', label: 'Horror' },
  { value: 'Thiller', label: 'Thiller' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Action', label: 'Action' },
];
export default function MovieForm({toggle,setMovieList,defaultValues={}}) {
  const {register,handleSubmit,watch,setValue}=useForm({defaultValues});
  
  
  useEffect(()=>{
    register('genres', { required: true });
  },[]);

  useEffect(()=>{
    if(defaultValues?.genres){
      selectHandler(defaultValues?.genres);
    }
  },[defaultValues?.genres]);

  function selectHandler(opt){
    setValue('genres',opt);
  }
  const watchGenres=watch('genres');

  function onSubmit(data){
    setMovieList(prev=>{
      let newList;
      if(defaultValues.id){
          newList=prev?.map(item=>{
          if(item?.id===defaultValues?.id){
            return {...item,...data};
          }else{
            return item;
          }
        });
      }else{
         newList = [...prev, { ...data, id: Math.floor(Math.random() * 100) }];
      }
      localStorage.setItem('list',JSON.stringify(newList)); 
      return newList;
    });
  }
  

  return (
    <div className="movieForm">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="movie">Name</Label>
          <Input
            innerRef={register({ required: true })}
            type="text"
            name="movie"
            id="movie"
            placeholder="name of your favourite movie"
          />
        </FormGroup>
        <FormGroup>
          <Label for="image">Image</Label>
          <Input
            innerRef={register({ required: true })}
            type="url"
            name="image"
            id="image"
            placeholder="image url of your favourite movie"
          />
        </FormGroup>
        <FormGroup>
          <Label for="rating">Ratings</Label>
          <Input
            innerRef={register({ required: true })}
            type="number"
            name="rating"
            id="rating"
            placeholder="8(out of 10)"
          />
        </FormGroup>
        <FormGroup>
          <Label for="voteCount">Vote Count</Label>
          <Input
            innerRef={register({ required: true })}
            type="number"
            name="voteCount"
            id="voteCount"
            placeholder="number of people who voted"
          />
        </FormGroup>
        <FormGroup>
          <Label for="releaseDate">Release Date</Label>
          <Input
            innerRef={register({ required: true })}
            type="date"
            name="releaseDate"
            id="releaseDate"
            placeholder="mm/dd/yyyy"
          />
        </FormGroup>
        <FormGroup>
          <Label for="language">Languages</Label>
          <Input
            innerRef={register({ required: true })}
            type="text"
            name="language"
            id="language"
            placeholder="languages seperated by comma's"
          />
        </FormGroup>
        <FormGroup>
          <Label for="genres">Genres</Label>
          <Select isMulti={true} name="genres" id="genres" value={watchGenres} options={options} onChange={selectHandler} />
        </FormGroup>
        <FormGroup>
          <Label for="overview">Overview</Label>
          <Input
            innerRef={register({ required: true })}
            type="textarea"
            name="overview"
            id="overview"
            placeholder="write the description about the movie"
          />
        </FormGroup>
        <FormGroup>
          <Label for="cast">Cast</Label>
          <Input
            innerRef={register({ required: true })}
            type="text"
            name="cast"
            id="cast"
            placeholder="movie cast seperated by comma's"
          />
        </FormGroup>
        <Button color="primary" type="submit" onClick={toggle}>
          Done
        </Button>
      </Form>
    </div>
  );
}
