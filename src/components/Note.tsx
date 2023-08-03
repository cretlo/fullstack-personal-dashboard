import { useState } from "react";
import { Note as NoteType } from "../types";
import Modal from "react-bootstrap/Modal";
import NoteEditor from "./NoteEditor";

interface Props {
  initialNote: NoteType;
  isNewNote: boolean;
  handleAddNote: (note: NoteType) => void;
  handleUpdateNote: (note: NoteType) => void;
  handleDeleteNote: (id: number) => void;
  handleNewNote?: (isNewNote: boolean) => void;
}

const Note = ({
  initialNote,
  isNewNote,
  handleNewNote,
  handleAddNote,
  handleUpdateNote,
  handleDeleteNote,
}: Props) => {
  const [show, setShow] = useState(isNewNote);
  const [note, setNote] = useState(initialNote);
  const displayedTitle = note.title ? note.title : "Untitled";

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);

    if (isNewNote && handleNewNote) {
      handleNewNote(false);
    }
  }

  function handleCancel() {
    handleClose();
    setNote(initialNote);
  }

  function handleSave() {
    if (Object.is(initialNote, note)) {
      handleClose();
      return;
    }

    if (isNewNote) {
      handleAddNote(note);
      handleClose();
    } else {
      handleUpdateNote(note);
      handleClose();
    }
  }

  function handleChange(updatedNote: NoteType) {
    setNote(updatedNote);
  }

  return (
    <>
      <button
        type="button"
        className="list-group-item list-group-item-action"
        onClick={handleShow}
      >
        {displayedTitle}
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
          <NoteEditor note={note} handleEditorChange={handleChange} />
        </Modal.Body>
        <Modal.Footer className="justify-content-start">
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
          {!isNewNote && (
            <button
              type="button"
              className="btn btn-danger ms-auto"
              onClick={() => handleDeleteNote(note.id)}
            >
              Delete
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Note;
