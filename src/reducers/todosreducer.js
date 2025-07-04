import { v4 as uuidv4 } from "uuid";
export default function todosReducer(currentTodos, action) {
  switch (action.type) {
    case "ADD": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        details: "",
        isCompleted: true,
      };

      const updatTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatTodos));
      return updatTodos;
    }
    case "deleted": {
      const updateTodo = currentTodos.filter((t) => {
        return t.id != action.payload.id;
      });

      localStorage.setItem("todos", JSON.stringify(updateTodo));

      return updateTodo;
    }
    case "updated": {
      const updateToDos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else return t;
      });

      localStorage.setItem("todos", JSON.stringify(updateToDos));
      return updateToDos;
    }
    case "get": {
      const storage = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storage;
    }
    case "toggle": {
      const updateedtodos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          const updatedTodo = { ...t, isCompleted: !t.isCompleted };
          return updatedTodo;
        }
        return t;
      });

      localStorage.setItem("todos", JSON.stringify(updateedtodos));
      return updateedtodos;
    }
    default: {
      throw Error("Invalid action type" + action.type);
    }
  }
  return [];
}
