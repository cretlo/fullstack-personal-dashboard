import { useState, FormEvent, useEffect } from "react";
import { TodoData } from "../../types";

interface Props {
    onAddTodo: (todo: TodoData) => void;
    loading: boolean;
    selected: string;
}

function AddTodo({ onAddTodo, loading, selected }: Props) {
    const [desc, setDesc] = useState("");
    const [color, setColor] = useState("#563d7c");

    useEffect(() => {
        if (selected !== "none") {
            setColor(selected);
        }
    }, [selected]);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        onAddTodo({
            id: -1,
            color,
            desc: desc,
            completed: false
        });
        setDesc("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <span>
                    <input
                        type="color"
                        className="form-control form-control-color"
                        id="exampleColorInput"
                        onChange={(e) => setColor(e.target.value)}
                        value={color}
                        title="Choose your color"
                    />
                </span>
                <input
                    type="test"
                    className="form-control"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                >
                    {loading ? "Loading..." : "Add To-Do"}
                </button>
            </div>
        </form>
    );
}

export default AddTodo;
