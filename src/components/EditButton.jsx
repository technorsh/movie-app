import React,{useState} from "react";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import MovieForm from "./MovieForm";

export default function EditButton({movie,setMovieList}){
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div>
            <Button color="primary" size="md" onClick={toggle} block>
          Edit
        </Button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit Your Favourite Movie</ModalHeader>
          <ModalBody>
            <MovieForm toggle={toggle} movie={movie} setMovieList={setMovieList}/>
          </ModalBody>
        </Modal>

        </div>
    )
}