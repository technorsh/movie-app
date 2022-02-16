import React, { useContext, useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Badge,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import axios from "axios";
import AppContext from "../../context/AppContext";
import MovieForm from "../../components/MovieForm";
import styled from "styled-components";

const MoviePageStyle=styled("div")`
  background-color: #f2fcf4;
  background-image: url("https://www.transparenttextures.com/patterns/climpek.png");
  min-height: 100vh;
  padding:5rem 1rem;
`
const MovieImg=styled("img")`
  border:2px whitesmoke solid;
  width: 80%;
`
const MarginPercentage=styled("div")`
  margin:${props=>props.first}% ${props=>props.second}%;
`
const MarginREM=styled("div")`
  margin:${props=>props.first}rem ${props=>props.second}rem;
`

export default function MoviePage() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { state, actions } = useContext(AppContext);
  const [movie, setMovie] = useState();
  const { id } = useParams();
  
  useEffect(() => {
    if (state?.isSearch) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=1f49aa891b7f48738c691da267debcdf&language=en-US`
        )
        .then((res) => {
          const data = res.data;
          setMovie({
            id: data?.id,
            overview: data?.overview,
            movie: data?.title,
            image: data?.poster_path
              ? `https://image.tmdb.org/t/p/w500${data?.poster_path}`
              : null,
            releaseDate: data?.release_date,
            language: data?.original_language,
            rating: data?.vote_average,
            voteCount: data?.vote_count,
            genres:data?.genres?.map(item=>{
              return {value:item?.name,label:item?.name};
            })
          });
        }).catch(err=>{
          console.log(err);
      });
    } else {
      setMovie(state?.movieList?.find((item) => item?.id === parseInt(id)));
    }
  }, [state?.movieList]);
  
  return (
    <MoviePageStyle>
      <Container>
        <Row>
          <Col md="6">
            <MarginPercentage first={5} second={5}>
              <MovieImg
                src={
                  movie?.image ??
                  "https://clients.cylindo.com/viewer/3.x/v3.0/documentation/img/not_found.gif"
                }
                alt={movie?.movie}
              />
            </MarginPercentage>
          </Col>
          <Col md="6">
            <MarginPercentage first={5} second={5}>
              <div className="movieName">
                <h1>{movie?.movie}</h1>
              </div>
              <MarginREM first={2} second={0}>
                <span>{`Release date : ${movie?.releaseDate}`}</span>
              </MarginREM>

              {movie?.genres && (
                <MarginREM first={2} second={0}>
                  <span>Tags : </span>
                  {movie?.genres.map((item, idx) => (
                    <MarginREM as="span" first={1} second={0.5} key={idx}>
                      <Badge color="success" pill>
                        {item?.label}
                      </Badge>
                    </MarginREM>
                  ))}
                </MarginREM>
              )}
              {movie?.language && (
                <MarginREM first={2} second={0}>
                  <span>Languages : </span>
                  {movie?.language.split(",").map((item) => (
                    <MarginREM as="span" first={1} second={0.5} key={item}>
                      <Badge color="warning">{item}</Badge>
                    </MarginREM>
                  ))}
                </MarginREM>
              )}
              <MarginREM first={1} second={0}>
                <p>
                  ⭐️⭐️⭐️ {`${movie?.rating} / ${movie?.voteCount} votes`}
                </p>
              </MarginREM>
            </MarginPercentage>
          </Col>
        </Row>

        {movie?.cast ? (
          <Row>
            <Col md="6">
              <MarginPercentage first={5} second={5}>
                <h4>Overview</h4>
                <p>{movie?.overview}</p>
              </MarginPercentage>
            </Col>
            <Col md="6">
              <MarginPercentage first={5} second={5}>
                <h4>Cast</h4>
                <ListGroup>
                  {movie?.cast.split(",").map((item, i) => (
                    <ListGroupItem key={i} color="light">
                      {item}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </MarginPercentage>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col md="12">
              <MarginPercentage first={5} second={5}>
                <h4>Overview</h4>
                <p>{movie?.overview}</p>
              </MarginPercentage>
            </Col>
          </Row>
        )}
        {state?.isSearch ? (
          <Row>
            <Col>
              <div className="save_button">
                <Button
                  onClick={() => actions?.onSaveHandler(movie)}
                  color="success"
                  size="md"
                  block
                >
                  Save
                </Button>
              </div>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <div className="removeButton">
                <Button
                  onClick={() => actions?.onRemoveHandler(parseInt(id))}
                  block
                  color="danger"
                  size="md"
                >
                  Remove
                </Button>
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
        )}
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Your Favourite Movie</ModalHeader>
        <ModalBody>
          <MovieForm toggle={toggle} defaultValues={movie} />
        </ModalBody>
      </Modal>
    </MoviePageStyle>
  );
}
