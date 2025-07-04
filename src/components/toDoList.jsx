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

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContext } from "../contexts/ToastContext";
import todosReducer from "../reducers/todosreducer";
import { useTodos, useDispatch } from "../contexts/toDosContext";
export default function toDolist() {
  const [inputtodo, setInputtodo] = React.useState("");
  const [displayTodo, setDisplayTodo] = React.useState("all");
  const [dialogTodo, setDialogTodo] = React.useState(null);
  const [showDelete, setShowDelete] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);

  const todos = useTodos();
  const dispatch = useDispatch();
  const { showHideToast } = React.useContext(ToastContext);
  const handelClick = () => {
    if (!inputtodo.trim()) return;
    dispatch({ type: "ADD", payload: { title: inputtodo } });
    setInputtodo("");
    showHideToast("todo added succful");
  };
  const handleUpdateClose = () => {
    setShowUpdate(false);
  };

  const handleUpdateConfirm = () => {
    dispatch({
      type: "updated",
      payload: {
        id: dialogTodo.id,
        title: dialogTodo.title,
        details: dialogTodo.details,
      },
    });
    setShowUpdate(false);
    showHideToast("todo updateted");
  };
  const handleDeleteClose = () => {
    setShowDelete(false);
  };
  const showDeleteOpen = (todo) => {
    setDialogTodo(todo);
    setShowDelete(true);
  };
  const showUpdateOpen = (todo) => {
    setDialogTodo(todo);
    setShowUpdate(true);
  };
  const handleDeleteConfirm = () => {
    dispatch({ type: "deleted", payload: { id: dialogTodo.id } });
    setShowDelete(false);
    showHideToast("to do deleted");
  };
  React.useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  const handlechange = (e) => {
    setDisplayTodo(e.target.value);
  };
  const filteredTodos = React.useMemo(() => {
    return todos.filter((todo) => {
      if (displayTodo === "completed") return todo.isCompleted;
      if (displayTodo === "non-completed") return !todo.isCompleted;
      return true;
    });
  }, [todos, displayTodo]);
  // 🎯 Filtrage des todos selon l'affichage sélectionné

  return (
    <div>
      {/*  delete dialog*/}
      <Dialog
        open={showDelete}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"delete ToDO"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure for delete this todo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Close</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/*  delete dialog*/}
      {/*  update dialog*/}
      <Dialog
        open={showUpdate}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Update ToDO"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure for update this todo?
          </DialogContentText>
          {dialogTodo && (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Title "
                fullWidth
                variant="standard"
                value={dialogTodo.title}
                onChange={(e) =>
                  setDialogTodo({ ...dialogTodo, title: e.target.value })
                }
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Description "
                fullWidth
                variant="standard"
                value={dialogTodo.details}
                onChange={(e) =>
                  setDialogTodo({ ...dialogTodo, details: e.target.value })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Close</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/*  update dialog*/}
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
              <ToDo
                key={todo.id}
                todo={todo}
                showDelet={showDeleteOpen}
                showUpdat={showUpdateOpen}
              />
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
