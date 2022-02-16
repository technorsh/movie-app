import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import styled from "styled-components";
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
      <Button color="info" size="lg" onClick={toggle} block>
        Add Your Favourite Movie
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Your Favourite Movie</ModalHeader>
        <ModalBody>
          <MovieForm toggle={toggle} />
        </ModalBody>
      </Modal>
    </AddMovieStyle>
  );
}