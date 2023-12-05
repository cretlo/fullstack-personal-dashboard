import { useState, useEffect } from "react";
import type { Note as NoteType } from "../../types";
import Note from "./Note";
import { useAlertContext } from "../../contexts/AlertContext";

import useNotesApi from "../../utils/api/useNotesApi";

const Notes = () => {
    const { notes, loading, error, fetchNotes, postNote, putNote, deleteNote } =
        useNotesApi();
    const [isNewNote, setIsNewNote] = useState(false);
    const { setAlert } = useAlertContext();
    const emptyNote: NoteType = {
        id: -1,
        title: "Untitled",
        note: "",
        editorState: ""
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    if (error) {
        setAlert(error, "danger");
    }

    async function handleAddNote(newNote: NoteType) {
        postNote(newNote);
    }

    async function handleUpdateNote(newNote: NoteType) {
        putNote(newNote);
    }

    async function handleDeleteNote(id: number) {
        deleteNote(id);
    }

    return (
        <>
            <div className="list-group">
                <button
                    className="list-group-item active sticky-top"
                    onClick={() => setIsNewNote(true)}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Create Note"}
                </button>
                <div
                    className="position-relative overflow-auto bg-warning"
                    style={{ maxHeight: "80vh" }}
                >
                    <div>
                        {notes.map((note) => {
                            return (
                                <Note
                                    key={note.id}
                                    isNewNote={false}
                                    initialNote={note}
                                    onUpdateNote={handleUpdateNote}
                                    onAddNote={handleAddNote}
                                    onDeleteNote={handleDeleteNote}
                                />
                            );
                        })}
                        {isNewNote && (
                            <Note
                                initialNote={emptyNote}
                                isNewNote={isNewNote}
                                onUpdateNote={handleAddNote}
                                onAddNote={handleAddNote}
                                onDeleteNote={handleDeleteNote}
                                onNewNote={setIsNewNote}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notes;
