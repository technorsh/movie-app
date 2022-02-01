import React from "react";
import { Container, Row, Col ,Button} from 'reactstrap';
import '../assests/MovieItem.css'

export default function MovieItem({movie,id,image,rating,overview}){
    return (
      <div className="movieItem">
        <Container>
          <Row>
            <Col md="4">
              <div className="movie-img">
                <img src={image} alt={movie} />
              </div>
            </Col>
            <Col md="8">
              <div className="movie-info">
                <h1>{movie}</h1>
                <h4>⭐️ {rating}</h4>
                <p>{overview.split(' ').slice(0,20).join(" ")+"..."}</p>
                <Button color="danger" size="md">Read more</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
}