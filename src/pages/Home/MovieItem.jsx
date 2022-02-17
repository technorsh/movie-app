import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import MovieForm from "../../components/MovieForm";
import AppContext from "../../context/AppContext";
import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent";

const MovieItemStyle = styled("div")`
  border: 2px whitesmoke solid;
  box-shadow: 20px 20px 50px gainsboro;
  margin: 5% 10%;
  padding: 3rem 3rem;
  background-color: #effaef;
`;
const MovieImageStyle = styled("img")`
  border: 2px white solid;
  width: 80%;
`;
const PaddingBottom = styled("h1")`
  padding-bottom: 1rem;
`;
const MarginButton = styled("span")`
  margin: 1rem 1rem ${(props) => props.bottom}rem ${(props) => props.left}rem;
`;

export default function MovieItem({ movie }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { state, actions } = useContext(AppContext);

  return (
    <MovieItemStyle>
      <Container>
        <Row>
          <Col md="4">
            <MovieImageStyle
              src={
                movie?.image ??
                "https://clients.cylindo.com/viewer/3.x/v3.0/documentation/img/not_found.gif"
              }
              alt={movie?.movie}
            />
          </Col>
          <Col md="8">
            <div>
              <PaddingBottom>{movie?.movie}</PaddingBottom>
              <PaddingBottom as="h4">⭐️⭐️⭐️ {movie?.rating}</PaddingBottom>
              <p>
                {movie?.overview?.length ? movie?.overview?.split(" ").slice(0, 20).join(" ") + "..." :""}
              </p>
              <Link to={`/${movie?.id}`}>
                <MarginButton bottom={0} left={0}>
                  <ButtonComponent color="success" size="sm" shadow>
                    Read more
                  </ButtonComponent>
                </MarginButton>
              </Link>
              {state?.isSearch === false && (
                <span>
                  <MarginButton bottom={0} left={1}>
                    <ButtonComponent
                      onClickHandler={() => actions?.onRemoveHandler(movie?.id)}
                      color="danger"
                      size="sm"
                      shadow
                    >
                      Remove
                    </ButtonComponent>
                  </MarginButton>
                  <MarginButton bottom={0} left={1}>
                    <ButtonComponent
                      color="primary"
                      size="sm"
                      onClickHandler={toggle}
                      shadow
                    >
                      Edit
                    </ButtonComponent>
                  </MarginButton>
                </span>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Your Favourite Movie</ModalHeader>
        <ModalBody>
          <MovieForm toggle={toggle} defaultValues={movie} />
        </ModalBody>
      </Modal>
    </MovieItemStyle>
  );
}
