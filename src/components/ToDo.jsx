import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Grid from "@mui/material/Grid";
import { TodosContext } from "../contexts/toDosContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
export default function ToDo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateTodo, setupdateTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const handelclick = () => {
    const updateedtodo = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updateedtodo);
    localStorage.setItem("todos", JSON.stringify(updateedtodo));
  };
  const handleDelete = () => {
    setShowDelete(true);
  };
  const handleUpdate = () => {
    setShowUpdate(true);
  };
  const handleDeleteClose = () => {
    setShowDelete(false);
  };
  const handleUpdateClose = () => {
    setShowUpdate(false);
  };
  const handleDeleteConfirm = () => {
    const updateTodo = todos.filter((t) => {
      return t.id != todo.id;
    });
    setTodos(updateTodo);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
  };
  const handleUpdateConfirm = () => {
    const updateToDos = todos.map((t) => {
      if (t.id == todo.id) {
        return { ...t, title: updateTodo.title, details: updateTodo.details };
      } else return t;
    });
    setTodos(updateToDos);
    localStorage.setItem("todos", JSON.stringify(updateToDos));
    setShowUpdate(false);
  };
  return (
    <>
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
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title "
            fullWidth
            variant="standard"
            value={updateTodo.title}
            onChange={(e) =>
              setupdateTodo({ ...updateTodo, title: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description "
            fullWidth
            variant="standard"
            value={updateTodo.details}
            onChange={(e) =>
              setupdateTodo({ ...updateTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Close</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/*  update dialog*/}
      <Card
        sx={{
          minWidth: 300,
          background: "gray",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid size={8}>
              <Typography
                variant="h6"
                sx={{
                  textAlign: "left",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "left" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid size={4}>
              <IconButton
                onClick={() => handelclick()}
                aria-label="check"
                //color="red"
                sx={
                  todo.isCompleted
                    ? {
                        color: "green",
                      }
                    : {
                        color: "red",
                      }
                }
              >
                <CheckCircleOutlineIcon />
              </IconButton>

              <IconButton
                aria-label="edit"
                onClick={handleUpdate}
                //color="primary"
                sx={{
                  "&:hover": {
                    color: "orange",
                    transform: "scale(1.2)",
                  },
                }}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                aria-label="delete"
                onClick={handleDelete}
                //color="primary"
                sx={{
                  "&:hover": {
                    color: "red",
                    transform: "scale(1.2)",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
