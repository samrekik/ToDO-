import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Grid from "@mui/material/Grid";
import { useTodos, useDispatch } from "../contexts/toDosContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { ToastContext } from "../contexts/ToastContext";
export default function ToDo({ todo, showDelet, showUpdat }) {
  const todos = useTodos();
  const dispatch = useDispatch();
  const { showHideToast } = React.useContext(ToastContext);

  const [updateTodo, setupdateTodo] = useState({
    title: todo.title,
    details: todo.details,
  });
  const handelclick = () => {
    dispatch({ type: "toggle", payload: { id: todo.id } });

    showHideToast("updateted");
  };
  const handleDelete = () => {
    showDelet(todo);
  };
  const handleUpdate = () => {
    showUpdat(todo);
  };

  return (
    <>
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
