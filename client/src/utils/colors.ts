import { TodoData } from "../types";

export function createColorSet(todos: TodoData[]): Set<string> {
    const hset: Set<string> = new Set();

    todos.forEach((todo) => {
        hset.add(todo.color);
    });

    return hset;
}
