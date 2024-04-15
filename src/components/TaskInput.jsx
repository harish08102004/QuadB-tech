import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/action";
import { TextField, Button, Box } from "@mui/material";

const TaskInput = () => {
  const [taskText, setTaskText] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTaskText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    // Dispatch action to add task
    dispatch(addTask(taskText));

    // Save tasks to local storage
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = {
      id: Math.floor(Math.random() * 10000), // Generate a random ID
      text: taskText,
      completed: false, // Assuming task is not completed initially
    };
    const updatedTasks = [...existingTasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Clear input field
    setTaskText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <TextField
          label="Task"
          variant="outlined"
          value={taskText}
          onChange={handleChange}
          style={{ marginRight: "10px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Task
        </Button>
      </Box>
    </form>
  );
};

export default TaskInput;
