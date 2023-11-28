import { useState, useEffect } from "react";
import type { Note as NoteType } from "../../types";
import Note from "./Note";
import { useAxiosContext } from "../../contexts/AxiosContext";
import { AxiosError } from "axios";
import { useAlertContext } from "../../contexts/AlertContext";

const Notes = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [isNewNote, setIsNewNote] = useState(false);
    const { customAxios } = useAxiosContext();
    const { setAlert } = useAlertContext();
    const emptyNote: NoteType = {
        id: -1,
        title: "Untitled",
        note: "",
        editorState: "",
    };

    useEffect(() => {
        customAxios
            .get(`${import.meta.env.VITE_API_URL}/notes`)
            .then((res) => {
                if (!res) {
                    throw new AxiosError("Error fetching all notes");
                }

                setNotes(res.data);
            })
            .catch((err) => {
                if (err instanceof AxiosError) {
                    if (err.response?.status === 401) {
                        return;
                    }
                }
            });
    }, []);

    async function addNote(newNote: NoteType) {
        try {
            const result = await customAxios.post(
                `${import.meta.env.VITE_API_URL}/notes`,
                newNote,
            );
            setNotes([...notes, result.data]);
            setAlert("Note successfully added", "success");
        } catch (err) {
            if (err instanceof AxiosError) {
                setAlert(err.response?.data.message, "danger");
            }
        }
    }

    async function updateNote(newNote: NoteType) {
        try {
            const result = await customAxios.put(
                `${import.meta.env.VITE_API_URL}/notes/${newNote.id}`,
                newNote,
            );
            setNotes(
                notes.map((note) =>
                    note.id === result.data.id ? result.data : note,
                ),
            );
            setAlert("Note successfully updated", "success");
        } catch (err) {
            if (err instanceof AxiosError) {
                setAlert(err.response?.data.message, "danger");
            }
        }
    }

    async function deleteNote(id: number) {
        try {
            const result = await customAxios.delete(
                `${import.meta.env.VITE_API_URL}/notes/${id}`,
            );
            setNotes(notes.filter((note) => note.id !== result.data.id));
            setAlert("Note successfully deleted", "success");
        } catch (err) {
            if (err instanceof AxiosError) {
                setAlert(err.response?.data.message, "danger");
            }
        }
    }

    return (
        <>
            <h2 className="mb-3">Notes</h2>
            <div className="list-group">
                <button
                    className="list-group-item active sticky-top"
                    onClick={() => setIsNewNote(true)}
                >
                    Create Note
                </button>
                <div
                    className="position-relative overflow-scroll bg-warning"
                    style={{ maxHeight: "80vh" }}
                >
                    <div>
                        {notes.map((note) => {
                            return (
                                <Note
                                    key={note.id}
                                    isNewNote={false}
                                    initialNote={note}
                                    updateNote={updateNote}
                                    addNote={addNote}
                                    deleteNote={deleteNote}
                                />
                            );
                        })}
                        {isNewNote && (
                            <Note
                                initialNote={emptyNote}
                                isNewNote={isNewNote}
                                updateNote={addNote}
                                addNote={addNote}
                                deleteNote={deleteNote}
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
