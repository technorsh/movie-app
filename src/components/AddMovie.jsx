import React,{useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MovieForm from "./MovieForm";

export default function AddMovie(){
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
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Done
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
}

