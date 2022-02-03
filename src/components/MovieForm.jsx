import React, { useEffect ,useContext} from "react";
import { Button, Form, FormGroup, Label, Input} from "reactstrap";
import { useForm } from "react-hook-form";
import MovieListContext from "../context/MovieListContext";
import Select from 'react-select';
const options = [
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Horror', label: 'Horror' },
  { value: 'Thiller', label: 'Thiller' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Crime', label: 'Crime' },
  { value: 'Mystery', label: 'Mystery' },
  { value: 'Action', label: 'Action' },
];
export default function MovieForm({toggle,defaultValues={}}) {
  const {register,handleSubmit,watch,setValue}=useForm({defaultValues});
  const {setMovieList}=useContext(MovieListContext);
  
  
  useEffect(()=>{
    register('genres', { required: true });
  },[]);

  useEffect(()=>{
    if(defaultValues?.genres){
      selectHandler(defaultValues?.genres);
    }
  },[defaultValues?.genres]);

  function selectHandler(opt){
    // console.log('opt ',opt);
    setValue('genres',opt);
    // debugger
  }
  const watchGenres=watch('genres');
  // console.log(watchGenres);

  function onSubmit(data){
    // console.log(watch('genres'));
    // console.log(data);
    setMovieList(prev=>{
      let newList;
      if(defaultValues?.id){
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
      // console.log(newList);
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
