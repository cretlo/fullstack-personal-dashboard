import { useState, useEffect } from "react";
import { type TodoData } from "../../types";

interface Props {
    todo: TodoData;
    updateTodo: (updatedTodo: TodoData) => void;
    deleteTodo: (id: number) => void;
}

export default function Todo({ todo, updateTodo, deleteTodo }: Props) {
    const [desc, setDesc] = useState(todo.desc);

    useEffect(() => {
        if (todo.desc === desc) {
            return;
        }

        const updateDesc = setTimeout(() => {
            updateTodo({
                ...todo,
                desc,
            });
        }, 2000);

        return () => clearTimeout(updateDesc);
    }, [desc, todo.completed]);

    return (
        <div className="input-group">
            <div className="input-group-text">
                <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() =>
                        updateTodo({ ...todo, completed: !todo.completed })
                    }
                    aria-label="Checkbox for completed todo"
                />
            </div>
            <input
                type="span"
                className="form-control"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
            />
            <button
                type="button"
                className="btn btn-danger"
                onClick={() => deleteTodo(todo.id)}
            >
                Delete
            </button>
            <div className="input-group-text p-0">
                <input
                    type="color"
                    className="form-control form-control-color"
                    id="exampleColorInput"
                    value={todo.color}
                    onChange={(e) =>
                        updateTodo({ ...todo, color: e.target.value })
                    }
                    title="Choose your color"
                />
            </div>
        </div>
    );
}
