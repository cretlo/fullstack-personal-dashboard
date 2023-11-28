import { useEffect, useState } from "react";
import { type TodoData } from "../../types";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { useAxiosContext } from "../../contexts/AxiosContext";
import { AxiosError } from "axios";
import { useAlertContext } from "../../contexts/AlertContext";

// Utils
import {
    initializeColorMap,
    addColorToMap,
    deleteFromColorMap,
    updateColorMap,
} from "../../utils/colors";

export default function Todos() {
    const [todos, setTodos] = useState<TodoData[]>([]);
    const [colorMap, setColorMap] = useState(initializeColorMap(todos));
    const [selected, setSelected] = useState("none");
    const { customAxios } = useAxiosContext();
    const { setAlert } = useAlertContext();

    const baseUrl = `${import.meta.env.VITE_API_URL}`;

    console.log(colorMap);

    useEffect(() => {
        customAxios
            .get(`${baseUrl}/todos`)
            .then((res) => {
                if (!res) {
                    throw new AxiosError("Error fetching all todos");
                }

                setTodos(res.data);
                setColorMap(initializeColorMap(res.data));
            })
            .catch((err) => {
                if (err instanceof AxiosError) {
                    if (err.response?.status === 401) {
                        return;
                    }
                } else {
                    console.error(err);
                }
            });
    }, []);

    const filteredTodos =
        selected !== "none"
            ? todos.filter((todo) => todo.color === selected)
            : todos;

    async function addTodo(todo: TodoData) {
        try {
            const res = await customAxios.post(`${baseUrl}/todos`, todo);

            setColorMap(addColorToMap(colorMap, res.data.color));
            setTodos([...todos, res.data]);
        } catch (err) {
            if (err instanceof AxiosError) {
                setAlert(err.response?.data.message, "danger");
            } else {
                console.error(err);
            }
        }
    }

    async function updateTodo(updatedTodo: TodoData) {
        try {
            const res = await customAxios.put(
                `${baseUrl}/todos/${updatedTodo.id}`,
                updatedTodo,
            );

            setColorMap(updateColorMap(colorMap, todos, res.data));

            setTodos(
                todos.map((todo) => {
                    if (todo.id !== res.data.id) {
                        return todo;
                    }

                    return updatedTodo;
                }),
            );
        } catch (err) {
            if (err instanceof AxiosError) {
                setAlert(err.response?.data.message, "danger");
            } else {
                console.error(err);
            }
        }
    }

    async function deleteTodo(id: number) {
        try {
            await customAxios.delete(`${baseUrl}/todos/${id}`);

            setColorMap(deleteFromColorMap(colorMap, todos, id));
            setTodos(
                todos.filter((todo) => {
                    return todo.id !== id;
                }),
            );
        } catch (err) {
            if (err instanceof AxiosError) {
                setAlert(err.response?.data.message, "danger");
            } else {
                console.error(err);
            }
        }
    }

    return (
        <>
            <h2 className="mb-3">Todos</h2>
            <AddTodo addTodo={addTodo} />
            <div className="d-flex flex-wrap gap-2 mb-3">
                {[...colorMap.keys()].map((color) => {
                    return (
                        <button
                            key={color}
                            type="button"
                            className={`btn ${
                                selected === color ? "active" : ""
                            }`}
                            onClick={() => setSelected(color)}
                        >
                            <div
                                className="py-1 rounded"
                                style={{
                                    backgroundColor: color,
                                    width: "32px",
                                    height: "32px",
                                }}
                            />
                        </button>
                    );
                })}
            </div>
            <ul className="list-group list-group-flush">
                {filteredTodos.map((todo) => {
                    return (
                        <li key={todo.id} className="list-group-item px-0">
                            <Todo
                                todo={todo}
                                updateTodo={updateTodo}
                                deleteTodo={deleteTodo}
                            />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
