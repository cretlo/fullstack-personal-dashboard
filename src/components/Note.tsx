import { useState } from "react";
import { Note as NoteType } from "../types";
import Modal from "react-bootstrap/Modal";
import NoteEditor from "./NoteEditor";
import "draft-js/dist/Draft.css";

interface Props {
  initialNote: NoteType;
  handleAddNote: (note: NoteType) => void;
  handleUpdateNote: (note: NoteType) => void;
  handleDeleteNote: (id: number) => void;
}

const Note = ({
  initialNote,
  handleAddNote,
  handleUpdateNote,
  handleDeleteNote,
}: Props) => {
  const [show, setShow] = useState(false);
  const [note, setNote] = useState(initialNote);

  if (note.id === 0) {
    console.log(note.editorState);
  }

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleCancel = () => {
    handleClose();
    setNote(initialNote);
  };
  const handleSave = () => {
    if (Object.is(initialNote, note)) {
      handleClose();
      return;
    }
    handleUpdateNote(note);
    handleClose();
  };

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
        <Modal.Header>
          <input
            className="form-control"
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            value={note.title}
          />
        </Modal.Header>
        <Modal.Body>
          <NoteEditor note={note} setNote={setNote} />
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Note;
