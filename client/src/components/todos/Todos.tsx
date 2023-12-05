import { useEffect, useState } from "react";
import { type TodoData } from "../../types";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { useAlertContext } from "../../contexts/AlertContext";
import ColorButton from "./ColorButton";

// Utils
import { createColorSet } from "../../utils/colors";
import useTodoApi from "../../utils/api/useTodoApi";

export default function Todos() {
    const { todos, loading, error, fetchTodos, postTodo, putTodo, deleteTodo } =
        useTodoApi();
    const [selected, setSelected] = useState("none");
    const { setAlert } = useAlertContext();

    const colorSet = createColorSet(todos);

    useEffect(() => {
        fetchTodos();
    }, []);

    if (error) {
        setAlert(error, "danger");
    }

    const filteredTodos =
        selected !== "none"
            ? todos.filter((todo) => todo.color === selected)
            : todos;

    function handleAddTodo(todo: TodoData) {
        postTodo(todo);
    }

    function handleUpdateTodo(todo: TodoData) {
        putTodo(todo);
    }

    function handleDeleteTodo(id: number) {
        deleteTodo(id);
    }

    return (
        <>
            <AddTodo
                onAddTodo={handleAddTodo}
                loading={loading}
                selected={selected}
            />
            <p>Filter:</p>
            <div className="d-flex flex-wrap gap-2 mb-3">
                <ColorButton
                    color="#000000"
                    selected={selected}
                    isCancelBtn={true}
                    setSelected={setSelected}
                />
                {[...colorSet.keys()].map((color) => {
                    return (
                        <ColorButton
                            key={color}
                            color={color}
                            isCancelBtn={false}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    );
                })}
            </div>
            <ul className="list-group list-group-flush todo-list">
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
