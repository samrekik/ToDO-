import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ToDoList from "./components/toDoList";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { TodosContext } from "./contexts/toDosContext";
function App() {
  const initodos = [
    {
      id: uuidv4(),
      title: "read book",
      details: "book of war",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      title: "eat food",
      details: "eat fruit",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      title: "trainning",
      details: "train trice and pcep",
      isCompleted: true,
    },
  ];
  const [todos, setTodos] = useState(initodos);
  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      <div className="flex justify-center bg-black items-center h-screen">
        <ToDoList />
      </div>
    </TodosContext.Provider>
  );
}

export default App;
