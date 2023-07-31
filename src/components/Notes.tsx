import { useState } from "react";
import { Note as NoteType } from "../types";
import Note from "./Note";

interface Props {
  initialNotes: NoteType[];
}

const Notes = ({ initialNotes }: Props) => {
  const [notes, setNotes] = useState(initialNotes);

  function handleAddNote(newNote: NoteType) {
    setNotes([...notes, newNote]);
  }

  function handleDeleteNote(id: number) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function handleUpdateNote(newNote: NoteType) {
    setNotes(notes.map((note) => (note.id === newNote.id ? newNote : note)));
  }

  return (
    <>
      <h2>Notes</h2>
      <div className="list-group">
        {notes.map((note) => {
          return (
            <Note
              key={note.id}
              note={note}
              handleUpdateNote={handleUpdateNote}
              handleAddNote={handleAddNote}
              handleDeleteNote={handleDeleteNote}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
