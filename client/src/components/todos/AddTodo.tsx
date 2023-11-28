import { useState, FormEvent } from "react";
import { TodoData } from "../../types";

interface Props {
    addTodo: (todo: TodoData) => void;
}

function AddTodo({ addTodo }: Props) {
    const [desc, setDesc] = useState("");
    const [color, setColor] = useState("#563d7c");

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        addTodo({
            id: -1,
            color,
            desc: desc,
            completed: false,
        });
        setDesc("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
                <button type="submit" className="btn btn-primary">
                    Add Todo
                </button>
                <input
                    type="test"
                    className="form-control"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
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
            </div>
        </form>
    );
}

export default AddTodo;
