import React, { useEffect, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useForm } from "react-hook-form";
import Select from "react-select";
import AppContext from "../context/AppContext";

const options = [
  { value: "Comedy", label: "Comedy" },
  { value: "Drama", label: "Drama" },
  { value: "Horror", label: "Horror" },
  { value: "Thiller", label: "Thiller" },
  { value: "Romance", label: "Romance" },
  { value: "Crime", label: "Crime" },
  { value: "Mystery", label: "Mystery" },
  { value: "Action", label: "Action" },
];

export default function MovieForm({ toggle, defaultValues = {} }) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues,
  });
  const { actions } = useContext(AppContext);

  useEffect(() => {
    //registering genres manually as the component mounts because react-select does not have ref prop
    register("genres", { required: true });
  }, []);

  useEffect(() => {
    //setting the default values for genres manually 
    if (defaultValues?.genres) {
      selectHandler(defaultValues?.genres);
    }
  }, [defaultValues?.genres]);

  function selectHandler(opt) {
    //manually setting the values of genres to opt   
    setValue("genres", opt);
  }
  const watchGenres = watch("genres");

  function onSubmit(data) {
    if (defaultValues?.id) {
      actions.onEditHandler(defaultValues?.id, data, toggle);
    } else {
      actions.onAddHandler(data, toggle);
    }
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
            innerRef={register({ required: true,pattern: /^[0-9-.]*$/})}
            type="text"
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
          <Select
            isMulti={true}
            name="genres"
            id="genres"
            value={watchGenres}
            options={options}
            onChange={selectHandler}
          />
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
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
