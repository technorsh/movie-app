import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Container,Row ,Col,Badge,ListGroup,ListGroupItem,Button , Modal, ModalHeader, ModalBody} from "reactstrap";
import '../assests/MoviePage.css';
import MovieForm from "./MovieForm";


export default function MoviePage({setMovieList}){
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const {id}=useParams();
    const list=JSON.parse(localStorage.getItem('list'));
    const movieList=list??[];
    const movie=movieList.find(item=> item.id===parseInt(id));
    

    function removeHandler(){
      setMovieList(prev=> {
        const newList=prev.filter(item=>item.id!==parseInt(id));
        localStorage.setItem('list',JSON.stringify(newList));
        return newList;
      });
    }
    // const movie = {
    //   genres: ["Action","Comedy"],
    //   id: 73.07921168487535,
    //   image:
    //     "https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/11/dhamaka-1637310639.jpg",
    //   movie: "Dhamaka",
    //   overview:
    //     "When a cynical ex-TV news anchor gets an alarming call on his radio show, he sees a chance for a career comeback -- but it may cost him his conscience.",
    //   rating: "7",
    //   releaseDate: "2022-01-30",
    //   voteCount: "3000",
    //   language:"English,Hindi,Spanish",
    //   cast:"Kartik Aryan,Mrunal Thakur,Akshay Kumar,Katrina Kaif",
    // };

    return (
      <div className="moviePage">
        <Container>
          <Row>
            <Col md="6">
              <div className="movieImage">
                <img src={movie.image} alt={movie.movie} />
              </div>
            </Col>
            <Col md="6">
              <div className="movieInfo">
                <div className="movieName">
                  <h1>{movie.movie}</h1>
                </div>
                <div className="releaseDate">
                  <span>{`Release date : ${movie.releaseDate}`}</span>
                </div>
                <div className="movieGenres">
                  <span>Tags : </span>
                  {movie.genres.map((item) => (
                    <span className="genreItem" key={item}>
                      <Badge color="success" pill>
                        {item.label}
                      </Badge>
                    </span>
                  ))}
                </div>
                <div className="movieLanguages">
                  <span>Languages : </span>
                  {movie.language.split(",").map((item) => (
                    <span className="languageItem" key={item}>
                      <Badge color="warning">{item}</Badge>
                    </span>
                  ))}
                </div>
                <div className="movieRating">
                  <p>⭐️⭐️⭐️ {`${movie.rating} / ${movie.voteCount} votes`}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col md="6">
              <div className="movieOverview">
                <h4>Overview</h4>
                <p>{movie.overview}</p>
              </div>
            </Col>
            <Col md="6">
              <div className="movieCast">
                <h4>Cast</h4>
                <ListGroup>
                  {movie.cast.split(",").map((item,i) => (
                    <ListGroupItem key={i} color="light">{item}</ListGroupItem>
                  ))}
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <div className="removeButton">
                <Link to="/">
                  <Button
                    onClick={removeHandler}
                    block
                    color="danger"
                    size="md"
                  >
                    Remove
                  </Button>
                </Link>
              </div>
            </Col>
            <Col>
              <div className="editButton">
                <Button color="primary" size="md" onClick={toggle} block>
                  Edit
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit Your Favourite Movie</ModalHeader>
          <ModalBody>
            <MovieForm toggle={toggle} defaultValues={movie} setMovieList={setMovieList}/>
          </ModalBody>
        </Modal>
      </div>
    );
}