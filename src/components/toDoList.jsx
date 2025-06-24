import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import ToDo from "./ToDo";
import { v4 as uuidv4 } from "uuid";
import Grid from "@mui/material/Grid";
import { TodosContext } from "../contexts/toDosContext";

export default function SimpleContainer() {
  const [inputtodo, setInputtodo] = React.useState("");
  const [displayTodo, setDisplayTodo] = React.useState("all");
  const { todos, setTodos } = React.useContext(TodosContext);
  const handelClick = () => {
    if (!inputtodo.trim()) return;
    const newTodo = {
      id: uuidv4(),
      title: inputtodo,
      details: "",
      isCompleted: true,
    };

    const updatTodos = [...todos, newTodo];
    setTodos(updatTodos);
    localStorage.setItem("todos", JSON.stringify(updatTodos));
    setInputtodo("");
  };
  React.useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("todos"));
    setTodos(storage);
  }, []);

  const handlechange = (e) => {
    setDisplayTodo(e.target.value);
  };
  // 🎯 Filtrage des todos selon l'affichage sélectionné
  const filteredTodos = todos.filter((todo) => {
    if (displayTodo === "completed") return todo.isCompleted;
    if (displayTodo === "non-completed") return !todo.isCompleted;
    return true;
  });
  return (
    <div>
      <Container maxWidth="md">
        <Card
          sx={{ minWidth: 500 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography gutterBottom variant="h2" sx={{ textAlign: "center" }}>
              To Do List
            </Typography>
            <Divider />
            <ToggleButtonGroup
              exclusive
              value={displayTodo}
              onChange={handlechange}
              aria-label="text alignment"
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              <ToggleButton value="all" aria-label="left aligned">
                All
              </ToggleButton>
              <ToggleButton value="completed" aria-label="centered">
                Valid
              </ToggleButton>
              <ToggleButton value="non-completed" aria-label="right aligned">
                Invalid
              </ToggleButton>
            </ToggleButtonGroup>
            {/* ✅ Mapping des todos */}
            {filteredTodos.map((todo) => (
              <ToDo key={todo.id} todo={todo} />
            ))}
            <Grid container spacing={2} sx={{ marginTop: 4 }}>
              <Grid size={8}>
                <TextField
                  className="w-full"
                  id="outlined-basic"
                  label="Title"
                  value={inputtodo}
                  onChange={(e) => setInputtodo(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid size={4}>
                <Button
                  variant="contained"
                  className="w-full h-full"
                  onClick={() => handelClick()}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
