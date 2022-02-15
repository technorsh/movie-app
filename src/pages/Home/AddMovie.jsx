import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import MovieForm from "../../components/MovieForm";
import "../../assests/css/AddMovie.scss"

export default function AddMovie() {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div className="addMovie">
      <Button color="info" size="lg" onClick={toggle} block>
        Add Your Favourite Movie
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Your Favourite Movie</ModalHeader>
        <ModalBody>
          <MovieForm toggle={toggle} />
        </ModalBody>
      </Modal>
    </div>
  );
}
