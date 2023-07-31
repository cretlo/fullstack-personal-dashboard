import { useState } from "react";
import { Note as NoteType } from "../types";
import Modal from "react-bootstrap/Modal";
import NoteEditor from "./NoteEditor";
import "draft-js/dist/Draft.css";

interface Props {
  note: NoteType;
  handleAddNote: (note: NoteType) => void;
  handleUpdateNote: (note: NoteType) => void;
  handleDeleteNote: (id: number) => void;
}

const Note = ({
  note,
  handleAddNote,
  handleUpdateNote,
  handleDeleteNote,
}: Props) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  function test() {
    handleAddNote(note);
    handleUpdateNote(note);
    handleDeleteNote(note.id);
  }

  return (
    <>
      <button
        type="button"
        className="list-group-item list-group-item-action"
        onClick={handleShow}
      >
        {note.title}
      </button>

      <Modal show={show} backdrop="static">
        <Modal.Header>Test</Modal.Header>
        <Modal.Body>
          <NoteEditor />
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn"
            onClick={handleClose}
            onChange={test}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Note;
