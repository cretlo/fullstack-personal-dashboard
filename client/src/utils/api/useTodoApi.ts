import { useState } from "react";
import { useAxiosContext } from "../../contexts/AxiosContext";
import { z } from "zod";
import { AxiosError } from "axios";

const todoSchema = z.object({
    id: z.number(),
    color: z.string().length(7),
    desc: z.string(),
    completed: z.boolean()
});

type Todo = z.infer<typeof todoSchema>;

const useTodoApi = () => {
    const [todos, setData] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { customAxios } = useAxiosContext();

    async function fetchTodos() {
        try {
            setLoading(true);

            const response = await customAxios.get("/todos");

            const data = response.data;

            const todos = z.array(todoSchema).parse(data);

            setData(todos);
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    async function postTodo(newTodo: Todo) {
        try {
            setLoading(true);

            const response = await customAxios.post(`/todos`, newTodo);
            const data = response.data;

            const todo = todoSchema.parse(data);

            setData([...todos, todo]);
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data.message);
            } else {
                console.error("Error adding todo", err);
            }
        } finally {
            setLoading(false);
        }
    }

    async function putTodo(todoToUpdate: Todo) {
        try {
            setLoading(true);

            const response = await customAxios.put(
                `/todos/${todoToUpdate.id}`,
                todoToUpdate
            );
            const data = response.data;

            const updatedTodo = todoSchema.parse(data);

            setData(
                todos.map((todo) => {
                    if (todo.id !== updatedTodo.id) {
                        return todo;
                    }

                    return updatedTodo;
                })
            );
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data.message);
            } else {
                console.error("Error adding todo", err);
            }
        } finally {
            setLoading(false);
        }
    }

    async function deleteTodo(id: number) {
        try {
            setLoading(true);
            await customAxios.delete(`/todos/${id}`);

            setData(
                todos.filter((todo) => {
                    return todo.id !== id;
                })
            );
        } catch (err) {
            if (err instanceof AxiosError) {
                setError(err.response?.data.message);
            } else {
                console.error("Error deleting todo", err);
            }
        } finally {
            setLoading(false);
        }
    }

    return { todos, loading, error, fetchTodos, postTodo, putTodo, deleteTodo };
};

export default useTodoApi;
