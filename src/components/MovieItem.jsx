import React ,{useContext, useState} from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col ,Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import MovieForm from "./MovieForm";
import MovieListContext from "../context/MovieListContext";
import '../assests/MovieItem.css'

export default function MovieItem({ movie}){
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const {setMovieList}=useContext(MovieListContext);

  function removeHandler(){
    setMovieList(prev=> {
      const newList=prev.filter(item=>item.id!==movie.id);
      localStorage.setItem('list',JSON.stringify(newList));
      return newList;
    });
  }
    return (
      <div className="movieItem">
        <Container>
          <Row>
            <Col md="4">
              <div className="movie-img">
                <img src={movie.image} alt={movie.movie} />
              </div>
            </Col>
            <Col md="8">
              <div className="movie-info">
                <h1>{movie.movie}</h1>
                <h4>⭐️⭐️⭐️ {movie.rating}</h4>
                <p>
                  {movie.overview.split(" ").slice(0, 20).join(" ") + "..."}
                </p>
                <Link to={`/${movie.id}`}>
                  <span className="readMoreButton">
                    <Button color="success" size="sm">
                      Read more
                    </Button>
                  </span>
                </Link>
                <span className="remove_button">
                  <Button onClick={removeHandler} color="danger" size="sm">
                    Remove
                  </Button>
                </span>
                <span className="edit_button">
                  <Button color="primary" size="sm" onClick={toggle}>
                    Edit
                  </Button>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit Your Favourite Movie</ModalHeader>
          <ModalBody>
            <MovieForm
              toggle={toggle}
              defaultValues={movie}
            />
          </ModalBody>
        </Modal>
      </div>
    );
}