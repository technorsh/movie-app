import React,{useState} from "react";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import MovieForm from "./MovieForm";
import '../assests/AddMovie.css';

export default function AddMovie({setMovieList}){
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
            <MovieForm toggle={toggle} setMovieList={setMovieList}/>
          </ModalBody>
        </Modal>
      </div>
    );
}

