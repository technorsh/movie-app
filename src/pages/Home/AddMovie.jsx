import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent";
import MovieForm from "../../components/MovieForm";

const AddMovieStyle=styled("div")`
  width:50%;
  margin:0.5rem 0.5rem;
`;

export default function AddMovie() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <AddMovieStyle>
      <ButtonComponent color="info" size="lg" onClickHandler={toggle} block shadow>
        Add Your Favourite Movie
      </ButtonComponent>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Your Favourite Movie</ModalHeader>
        <ModalBody>
          <MovieForm toggle={toggle} />
        </ModalBody>
      </Modal>
    </AddMovieStyle>
  );
}