import { useState } from "react";
import { useAxiosContext } from "../../contexts/AxiosContext";
import { z } from "zod";
import { AxiosError } from "axios";

const notesSchema = z.object({
    id: z.number(),
    title: z.string().optional(),
    note: z.string().optional(),
    editorState: z.string().optional()
});

type Note = z.infer<typeof notesSchema>;

const useNotesApi = () => {
    const [notes, setData] = useState<Note[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { customAxios } = useAxiosContext();

    async function fetchNotes() {
        try {
            setLoading(true);

            const response = await customAxios.get("/notes");

            const data = response.data;

            const notes = z.array(notesSchema).parse(data);

            setData(notes);

            return notes;
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    async function postNote(newTodo: Note) {
        try {
            setLoading(true);

            const response = await customAxios.post(`/notes`, newTodo);
            const data = response.data;

            const note = notesSchema.parse(data);

            setData([...notes, note]);
            return note;
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data.message);
            } else {
                console.error("Error adding note", err);
            }
        } finally {
            setLoading(false);
        }
    }

    async function putNote(noteToUpdate: Note) {
        try {
            setLoading(true);

            const response = await customAxios.put(
                `/notes/${noteToUpdate.id}`,
                noteToUpdate
            );
            const data = response.data;

            const updatedNote = notesSchema.parse(data);

            setData(
                notes.map((note) => {
                    if (note.id !== updatedNote.id) {
                        return note;
                    }

                    return updatedNote;
                })
            );

            return updatedNote;
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data.message);
            } else {
                console.error("Error updating note", err);
            }
        } finally {
            setLoading(false);
        }
    }

    async function deleteNote(id: number) {
        try {
            setLoading(true);
            await customAxios.delete(`/notes/${id}`);

            setData(
                notes.filter((note) => {
                    return note.id !== id;
                })
            );

            return true;
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data.message);
            } else {
                console.error("Error deleting note", err);
            }
        } finally {
            setLoading(false);
        }
    }

    return {
        notes,
        loading,
        error,
        fetchNotes,
        postNote,
        putNote,
        deleteNote
    };
};

export default useNotesApi;
