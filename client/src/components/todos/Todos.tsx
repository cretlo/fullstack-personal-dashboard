import { useEffect, useState } from "react";
import { type TodoData } from "../../types";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { useAlertContext } from "../../contexts/AlertContext";
import ColorButton from "./ColorButton";

// Utils
import {
    initializeColorMap,
    addColorToMap,
    deleteFromColorMap,
    updateColorMap,
} from "../../utils/colors";
import useTodoApi from "../../utils/api/useTodoApi";

export default function Todos() {
    const { todos, loading, error, fetchTodos, postTodo, putTodo, deleteTodo } =
        useTodoApi();
    const [colorMap, setColorMap] = useState(initializeColorMap(todos));
    const [selected, setSelected] = useState("none");
    const { setAlert } = useAlertContext();

    useEffect(() => {
        fetchTodos().then((fetchedTodos) => {
            if (fetchedTodos) {
                setColorMap(initializeColorMap(fetchedTodos));
            }
        });
    }, []);

    if (error) {
        setAlert(error, "danger");
    }

    const filteredTodos =
        selected !== "none"
            ? todos.filter((todo) => todo.color === selected)
            : todos;

    async function handleAddTodo(todo: TodoData) {
        const newTodo = await postTodo(todo);

        if (newTodo) {
            setColorMap(addColorToMap(colorMap, newTodo.color));
        }
    }

    async function handleUpdateTodo(todo: TodoData) {
        const updatedTodo = await putTodo(todo);

        if (updatedTodo) {
            setColorMap(updateColorMap(colorMap, todos, updatedTodo));
        }
    }

    async function handleDeleteTodo(id: number) {
        const isDeleted = await deleteTodo(id);

        if (isDeleted) {
            setColorMap(deleteFromColorMap(colorMap, todos, id));
        }
    }

    return (
        <>
            <h2 className="mb-3">ToDos</h2>
            <AddTodo onAddTodo={handleAddTodo} loading={loading} />
            <p>Filter:</p>
            <div className="d-flex flex-wrap gap-2 mb-3">
                {[...colorMap.keys()].map((color) => {
                    return (
                        <ColorButton
                            key={color}
                            color={color}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    );
                })}
            </div>
            <ul className="list-group list-group-flush">
                {filteredTodos.map((todo) => {
                    return (
                        <li key={todo.id} className="list-group-item px-0">
                            <Todo
                                todo={todo}
                                updateTodo={handleUpdateTodo}
                                deleteTodo={handleDeleteTodo}
                            />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
