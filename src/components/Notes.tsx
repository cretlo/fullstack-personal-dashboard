import { useState } from "react";
import { Note as NoteType } from "../types";
import Note from "./Note";

interface Props {
  initialNotes: NoteType[];
}

const Notes = ({ initialNotes }: Props) => {
  const [notes, setNotes] = useState(initialNotes);
  const [isNewNote, setIsNewNote] = useState(false);
  const newNote: NoteType = {
    id: notes[notes.length - 1].id + 1,
    title: "Untitled",
    note: "",
    editorState: "",
  };

  function handleAddNote(newNote: NoteType) {
    setNotes([...notes, newNote]);
  }

  function handleDeleteNote(id: number) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function handleUpdateNote(newNote: NoteType) {
    setNotes(notes.map((note) => (note.id === newNote.id ? newNote : note)));
  }

  function handleAddNewNote() {
    setIsNewNote(true);
  }

  return (
    <>
      <h2 className="mb-3">Notes</h2>
      <div
        className="position-relative overflow-scroll bg-warning"
        style={{ maxHeight: "80vh" }}
      >
        <div className="list-group">
          <button
            className="list-group-item active sticky-top"
            onClick={handleAddNewNote}
          >
            Create Note
          </button>
          <div>
            {notes.map((note) => {
              return (
                <Note
                  key={note.id}
                  isNewNote={false}
                  initialNote={note}
                  handleUpdateNote={handleUpdateNote}
                  handleAddNote={handleAddNote}
                  handleDeleteNote={handleDeleteNote}
                />
              );
            })}
            {isNewNote && (
              <Note
                initialNote={newNote}
                isNewNote={isNewNote}
                handleUpdateNote={handleAddNote}
                handleAddNote={handleAddNote}
                handleDeleteNote={handleDeleteNote}
                handleNewNote={setIsNewNote}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
