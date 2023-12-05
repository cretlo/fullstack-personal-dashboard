import { useState } from "react";
import type { Note as NoteType } from "../../types";
import Modal from "react-bootstrap/Modal";
import NoteEditor from "./NoteEditor";

interface Props {
    initialNote: NoteType;
    isNewNote: boolean;
    onAddNote: (note: NoteType) => void;
    onUpdateNote: (note: NoteType) => void;
    onDeleteNote: (id: number) => void;
    onNewNote?: (isNewNote: boolean) => void;
}

const Note = ({
    initialNote,
    isNewNote,
    onNewNote,
    onAddNote,
    onUpdateNote,
    onDeleteNote
}: Props) => {
    const [show, setShow] = useState(isNewNote);
    const [note, setNote] = useState(initialNote);
    const displayedTitle = note.title ? note.title : "Untitled";

    function handleShow() {
        setShow(true);
    }

    function handleClose() {
        setShow(false);

        if (isNewNote && onNewNote) {
            onNewNote(false);
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
            onAddNote(note);
        } else {
            onUpdateNote(note);
        }

        handleClose();
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

            <Modal size="lg" show={show} backdrop="static" centered>
                <Modal.Header>
                    <input
                        className="form-control"
                        onChange={(e) =>
                            setNote({ ...note, title: e.target.value })
                        }
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
                            onClick={() => onDeleteNote(note.id)}
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
