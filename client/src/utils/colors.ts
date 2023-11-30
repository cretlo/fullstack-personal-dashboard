import { TodoData } from "../types";

export function initializeColorMap(todos: TodoData[]): Map<string, number> {
    const newColorMap = new Map<string, number>();
    //newColorMap.set("none", -1);

    for (let i = 0; i < todos.length; i++) {
        const key = todos[i].color;

        if (newColorMap.has(key)) {
            const value = newColorMap.get(key);

            if (!value) {
                throw new Error("value not initialized in newColorMap");
            }

            newColorMap.set(key, value + 1);
        } else {
            newColorMap.set(key, 1);
        }
    }

    return newColorMap;
}

export function addColorToMap(
    oldColorMap: Map<string, number>,
    color: string,
): Map<string, number> {
    const newColorMap = new Map(oldColorMap);

    if (newColorMap.has(color)) {
        const value = newColorMap.get(color);

        if (!value) throw new Error("value doesn't exist in colorMap");

        newColorMap.set(color, value + 1);
    } else {
        newColorMap.set(color, 1);
    }

    return newColorMap;
}

export function updateColorMap(
    oldColorMap: Map<string, number>,
    todos: TodoData[],
    updatedTodo: TodoData,
): Map<string, number> {
    const todo = todos.find((todo) => todo.id === updatedTodo.id);

    if (!todo)
        throw new Error(
            `todo does not exist with id: ${updatedTodo.id} in todos`,
        );

    if (todo.color === updatedTodo.color) {
        // It wasn't the color that was updated
        return oldColorMap;
    }

    const newColorMap = new Map(oldColorMap);
    const oldColorCount = newColorMap.get(todo.color);

    if (!oldColorCount) throw new Error("old color count does not exist");

    if (oldColorCount === 1) {
        newColorMap.delete(todo.color);
    } else {
        const updatedOldCount = oldColorCount - 1;
        newColorMap.set(todo.color, updatedOldCount);
    }

    if (newColorMap.has(updatedTodo.color)) {
        const value = newColorMap.get(updatedTodo.color);

        if (!value)
            throw new Error(
                "updatedColorMap: Error: updatedTodo color value does not exist",
            );

        newColorMap.set(updatedTodo.color, value + 1);
    } else {
        newColorMap.set(updatedTodo.color, 1);
    }

    return newColorMap;
}

export function deleteFromColorMap(
    oldColorMap: Map<string, number>,
    todos: TodoData[],
    id: number,
): Map<string, number> {
    const newColorMap = new Map(oldColorMap);

    const todo = todos.find((todo) => todo.id === id);

    if (!todo) throw new Error(`todo does not exist with id: ${id}`);

    if (newColorMap.get(todo.color) === 1) {
        newColorMap.delete(todo.color);
    } else {
        const value = newColorMap.get(todo.color);

        if (!value) throw new Error("value doesn't exist in colorMap");

        newColorMap.set(todo.color, value - 1);
    }

    return newColorMap;
}
